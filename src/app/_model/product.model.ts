import { FileHandle} from "./file-handle.model";

export interface product
{
    
	 productName : string,
	 productDescription : string,
	 productActualPrice : number,
	productDiscountPrice : number,
	productImages : FileHandle[]
	
}