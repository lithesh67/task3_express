const scheduledQueries = require("./scheduled.queries");
const {s3}=require('../../aws/s3/s3Files');
const xlsx=require('xlsx');
const { excelRowSchema } = require("./dto/scheduled.joi");
const { insert } = require("../../mysql/db");

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
                let jsonData=xlsx.utils.sheet_to_json(sheet,{defval:""});
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
                Key: 'errors'+file_name,
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

    static async validateAndInsert(jsonRow,objCategories,objVendors,validRows){
        try{
           let vendors=jsonRow['vendors'].split(',');
           let errors="";
           if(!objCategories[jsonRow.category.toLowerCase()]){
             errors+="Invalid category for the products. "
             return errors;
           }
           const category_id= objCategories[jsonRow.category.toLowerCase()];
           let newRow=jsonRow;
           newRow['category_id']=category_id;
           let validVendors=[];
           for(let vendor of vendors){
             if(!objVendors[vendor.trim().toLowerCase()]){
               errors+=`vendor '${vendor}' does not exist. `;
               continue;
             }
             validVendors.push(objVendors[vendor.trim().toLowerCase()]);
            }
           if(validVendors.length!=0)
           {
               newRow['vendors']=validVendors;
               validRows.push(newRow);
           }
           return errors;
        }
        catch(err){
            throw err;
        }
    }

    static async validateRows(jsonSheet,sheetName,newWorkbook,objCategories,objVendors,validRows){
        try{
           let newJsonSheet=[];
           for(let j=0;j<jsonSheet.length;j++){
           
             let {product_name,category,vendors,quantity_in_stock,unit_price,measure}=jsonSheet[j];
             const {error}=excelRowSchema.validate({product_name,category,vendors,quantity_in_stock,unit_price,measure},{abortEarly:false});
             if(error){
                jsonSheet[j]['error']=error.message;
                newJsonSheet.push(jsonSheet[j]);
                continue;
             }
          
             const rowErrors=await this.validateAndInsert(jsonSheet[j],objCategories,objVendors,validRows);
             if(rowErrors!=''){
                jsonSheet[j]['error']=rowErrors;
                newJsonSheet.push(jsonSheet[j]);
             }
           }

           if(newJsonSheet.length==0){
             return;
           }
            const newSheet=xlsx.utils.json_to_sheet(newJsonSheet);
            xlsx.utils.book_append_sheet(newWorkbook,newSheet,sheetName);
            
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

    static async notifyUser(file_data,newWorkbook,insertedCount){
       try{
          let message="";
          let notification_title="";
          if(newWorkbook.SheetNames.length!=0){
            message=`Several products are not created, check the error file, inserted ${insertedCount} rows`;
            notification_title=`Error processing ${file_data[0].file_name}`;
          }
          else{
            message=`Products inserted successfully, inserted ${insertedCount} rows`;
            notification_title=`File ${file_data[0].file_name} processed successfully`;
          }
          await scheduledQueries.insertNotification(file_data,message,notification_title);
       }
       catch(err){
        throw err;
       }
    }

}