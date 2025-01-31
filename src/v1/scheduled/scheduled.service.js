const scheduledQueries = require("./scheduled.queries");
const {s3}=require('../../aws/s3/s3Files');
const xlsx=require('xlsx');
const { excelRowSchema } = require("./dto/scheduled.joi");

module.exports= class scheduledService{
    static async getUnprocessedFile(){
        try{
           const files=await scheduledQueries.getUnprocessedFile();
           return files;
        }
        catch(err){
            throw err;
        }
    }

    static async fetchFileFromAWS(file_url){
        try{
          const key_of_url=file_url.split('.com/')[1];
          console.log(key_of_url);
          console.log(process.env.aws_BUCKET_NAME);
          const params={
            Bucket:process.env.aws_BUCKET_NAME,
            Key:key_of_url
          }
          const file=await s3.getObject(params).promise();
          return file;
        }
        catch(err){
            throw err;
        }
    }

    static async getSheetsOfWorkbook(workbook){
        try{
            const sheets=[];
            for(let sheetName of workbook.SheetNames){
                let sheet=workbook.Sheets[sheetName];
                let jsonData=xlsx.utils.sheet_to_json(sheet);
                sheets.push(jsonData);
            }
            return sheets;
        }
        catch(err){
            throw err;
        }
    }

    static validateColHeadings(colHeadings){
        const requiredHeadings={'product_name':0,'quantity_in_stock':0,'category':0,'unit_price':0,'measure':0,'vendors':0};
        let count=0;
        let errors="";
        for(let col of colHeadings){
            if(requiredHeadings[col]==0){
              count+=1;
           }
        }
        if(count>6){
            return "Duplicated column names";
        }
        if(count<6){
            return "Required columns are not present";
        }
        return null;
    }

    static async uploadWorkbookToAWS(buffer,file_name){
        try{
            const params={
                Bucket:process.env.aws_BUCKET_NAME, 
                Key: 'errors'+Date.now()+file_name,
                Body: buffer
            }
            const result=await s3.upload(params).promise();
            
            return result;
        }
        catch(err){  
            throw err;
        }
    }

    static async storeTheErrorUrl(error_url,file_id){
        try{
            await scheduledQueries.storeTheErrorUrl(error_url,file_id);
        }
        catch(err){
            throw err;
        }
    }

    static async validateAndInsert(jsonRow,objCategories,objVendors){
        try{
           let vendors=jsonRow['vendors'].split(',');
           let errors='';
           for(let vendor of vendors){
             if(objVendors[vendor]){
                
             }
           }
        
        }
        catch(err){
            throw err;
        }
    }

    static async validateRows(jsonSheet,sheetName,objCategories,objVendors){
        try{
           let newJsonSheet=[];
           for(let j=0;j<jsonSheet.length;j++){
             let {product_name,category,vendors,quantity_in_stock,unit_price,measure}=jsonSheet[j];
             const {error}=excelRowSchema.validate({product_name,category,vendors,quantity_in_stock,unit_price,measure},{abortEarly:false});
             if(error){
                jsonSheet[j]['error']=error;
                newJsonSheet.push(jsonSheet[j]);
                continue;
             }
             await validateAndInsert(jsonSheet[j],objCategories,objVendors);
           }
            // const newSheet=xlsx.utils.json_to_sheet(jsonSheet);
            // xlsx.utils.book_append_sheet(newWorkbook,newSheet,sheetName);
            // const buffer=xlsx.write(newWorkbook,{type:'buffer',bookType:'xlsx'});
            // const result=await uploadWorkbookToAWS(buffer,file_data[0].file_name);  
            // await storeTheErrorUrl(result.Location,file_data[0].file_id);  
            // console.log("stored");
            // console.log(result);
        } 
        catch(err){
            throw err;
        }
    }

    static  transform(categories,vendors){
       let objCategories=categories.reduce((acc,curr)=>{
          acc[curr.category.toLowerCase()]=curr.category_id;
          return acc;
       },{});

       let objVendors=vendors.reduce((acc,curr)=>{
          acc[curr.vendor_name.toLowerCase()]=curr.vendor_id;
          return acc;
       },{});
       return {objCategories,objVendors};
    }

}