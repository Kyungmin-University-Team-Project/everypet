import React, {useState} from 'react';
import styles from './ImageUpload.module.css';

const ImageUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    // Additional form fields
    const [memberId, setMemberId] = useState<string>('');
    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productDiscountRate, setProductDiscountRate] = useState<number>(0);
    const [numberOfProduct, setNumberOfProduct] = useState<number>(0);
    const [productCategory, setProductCategory] = useState<string>('');
    const [productSalesStatusYN, setProductSalesStatusYN] = useState<string>('Y');
    const [descriptionImage, setDescriptionImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDescriptionImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setDescriptionImage(file);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile || !descriptionImage) return;

        const formData = new FormData();
        formData.append('memberId', memberId);
        formData.append('productId', productId);
        formData.append('productName', productName);
        formData.append('productPrice', productPrice.toString());
        formData.append('productDiscountRate', productDiscountRate.toString());
        formData.append('productImage', selectedFile);
        formData.append('numberOfProduct', numberOfProduct.toString());
        formData.append('productDescriptionImage', descriptionImage);
        formData.append('productCategory', productCategory);
        formData.append('productSalesStatusYN', productSalesStatusYN);

        // Log form data to the console
        console.log({
            memberId,
            productId,
            productName,
            productPrice,
            productDiscountRate,
            numberOfProduct,
            productCategory,
            productSalesStatusYN,
            productImage: selectedFile.name,
            productDescriptionImage: descriptionImage.name,
        });

        try {
            const response = await fetch('http://localhost:3000/insert-product', {
                method: 'POST',
                body: formData,
            });

            // Check the content type of the response
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                let errorMessage = 'Image upload failed.';
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    const errorText = await response.text();
                    console.error('Server Error:', errorText);
                    errorMessage = `Server responded with: ${response.status} ${response.statusText}`;
                }
                setUploadStatus(errorMessage);
            } else {
                setUploadStatus('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Image upload failed.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Member ID:
                    <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} required
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Product ID:
                    <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Product Name:
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Product Price:
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))}
                           required className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Discount Rate:
                    <input type="number" value={productDiscountRate}
                           onChange={(e) => setProductDiscountRate(Number(e.target.value))} required
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Number of Products:
                    <input type="number" value={numberOfProduct}
                           onChange={(e) => setNumberOfProduct(Number(e.target.value))} required
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Product Category:
                    <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}
                           required className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Sales Status:
                    <select value={productSalesStatusYN} onChange={(e) => setProductSalesStatusYN(e.target.value)}
                            required className={styles.input}>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                </label>
                <label className={styles.label}>
                    Product Image:
                    <input type="file" onChange={handleFileChange} required className={styles.input}/>
                </label>
                {previewUrl && (
                    <div className={styles.preview}>
                        <img src={previewUrl} alt="Selected preview" className={styles.previewImage}/>
                    </div>
                )}
                <label className={styles.label}>
                    Description Image:
                    <input type="file" onChange={handleDescriptionImageChange} required className={styles.input}/>
                </label>
                <button type="submit" className={styles.button}>Upload Image</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUpload;
