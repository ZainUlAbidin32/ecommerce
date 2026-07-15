import cloudinary from "./cloudinary";

export const uploadImage = async (file: File): Promise<string> => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise((resolve, reject)=> {
        cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce/products"
            },
            (error, result)=>{
                if (error){
                    reject(error)
                    return
                }
                resolve(result!.secure_url)
            }
        ).end(buffer)
    })
}