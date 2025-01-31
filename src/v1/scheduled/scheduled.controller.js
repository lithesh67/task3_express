const xlsx=require('xlsx');
const scheduledService = require('./scheduled.service');
const { getCategories_vendors } = require('../dashboard/dashboard.queries');





module.exports.processExcel=async()=>{
   try{
     const file_data=await scheduledService.getUnprocessedFile();
     if(file_data.length==0){
        return;
     }
    const {categories,vendors}=await getCategories_vendors();
    const {objCategories,objVendors}=scheduledService.transform(categories,vendors);

    const file_url=file_data[0].file_path;
    console.log(file_url);
    
    const file=await scheduledService.fetchFileFromAWS(file_url);
    const workbook = xlsx.read(file.Body, {type: 'buffer'});
    const jsonSheets=await scheduledService.getSheetsOfWorkbook(workbook);

    let newWorkbook=xlsx.utils.book_new();
    for(let i=0;i<jsonSheets.length;i++){
        let colHeadings=Object.keys(jsonSheets[i][0]);
        let jsonSheetName=workbook.SheetNames[i];
        let errors=scheduledService.validateColHeadings(colHeadings);
        if(errors){
           jsonSheets[i][0]['errors']=errors;
           const newSheet=xlsx.utils.json_to_sheet(jsonSheets[i]);
           xlsx.utils.book_append_sheet(newWorkbook,newSheet,jsonSheetName);
           const buffer=xlsx.write(newWorkbook,{type:'buffer',bookType:'xlsx'});
           const result=await scheduledService.uploadWorkbookToAWS(buffer,file_data[0].file_name);  
           await scheduledService.storeTheErrorUrl(result.Location,file_data[0].file_id);  
           console.log("stored");
           console.log(result);
           return;
        }

        // if there are no validation errors in col headings
        await scheduledService.validateRows(jsonSheets[i],jsonSheetName,newWorkbook,objCategories,objVendors);
    }
    
    
   }
   catch(err){
     console.log(err);
     
   }
}