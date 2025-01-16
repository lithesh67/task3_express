const aws=require('aws-sdk');
aws.config.update({
    accessKeyId    :  process.env.aws_ACCESS_KEY,
    secretAccessKey:  process.env.aws_SECRET_ACCESS_KEY,
    region         :  process.env.aws_REGION
});

const s3=new aws.S3();

const getPreSignedUrl=async(bucketName,fileKey,fileType)=>{
    const params={
        Bucket: bucketName,
        Key: fileKey,
        Expires: 60,
        ContentType: fileType
    }
    return s3.getSignedUrlPromise("putObject",params);
}

module.exports={getPreSignedUrl};


