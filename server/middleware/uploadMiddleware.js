import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const s3Client = new S3Client({
    region: process.env.AWS_ACCOUNT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
    },
  });

const uploadImage=async (folderName,file) => {
    try {
      const contentType = file.mimetype;
  
      const command =new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:`${folderName}/${file.originalname}`,
        Body: file.buffer,
        ContentType: contentType,
      });
  
      const response = await s3Client.send(command);
      console.log("File uploaded to S3:", response);
    
    } catch (error) {
      console.error("Failed to upload file to S3:", error);
    }
  };
export {uploadImage};