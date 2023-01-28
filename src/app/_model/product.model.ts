import { FileHandle } from "./file-handle.model";

export interface product {
    productId:number,
	productName: string,
	productDescription: string,
	productActualPrice: number,
	productDiscountPrice: number,
	productImages: FileHandle[]

}