declare module 'edgeros:multer' {
  export * from 'multer';
}

declare module "multer" {

  interface MulterLimits {
    fieldNameSize?: number; //	Max field name size	100 bytes
    fieldSize?: number; //	Max field value size (in bytes)	1MB
    fields?: number; //	Max number of non-file fields	Infinity
    fileSize?: number; //	For multipart forms, the max file size (in bytes)	Infinity
    files?: number; //	For multipart forms, the max number of file fields	Infinity
    parts?: number; //	For multipart forms, the max number of parts (fields + files)	Infinity
    headerPairs?: number; //	For multipart forms, the max number of header key=>value pairs to parse	2000
  }
  type MulterOpts = {
    [key in "storage" | "dest"]: string | Function;
  } & {
    fileFilter?: (req: string, file: File, cb: Function) => void; // {Function} Function to control which files are accepted.
    limits?: MulterLimits; // {Object} Limits of the uploaded data.
    preservePath?: string; // {Boolean} Keep the full path of files instead of just the base name.
  };



  class Multer {
    multer(opts: MulterOpts)
    diskStorage(opts: { destination: string, filename: Function })
    memoryStorage()
  }

  class Upload {
    single(fieldname: string)
    array(fieldname: string, maxCount?: number)
    fields(fields: Array<any>)
    none()
    any()

  }

  interface File {
    fieldname?: string; //	Field name specified in the form	
    originalname?: string; //	Name of the file on the user's computer	
    encoding?: string; //	Encoding type of the file	
    mimetype?: string; //	Mime type of the file	
    size?: string; //	Size of the file in bytes	
    destination?: string; //	The folder to which the file has been saved	DiskStorage
    filename?: string; //	The name of the file within the destination	DiskStorage
    path?: string; //	The full path to the uploaded file	DiskStorage
    buffer?: string; //	A Buffer of the entire file	
  }
}
