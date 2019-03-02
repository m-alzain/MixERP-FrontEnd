import { HttpErrorResponse } from '@angular/common/http';

export function friendly(error: any) {
  // Translates HttpClient's errors into human-friendly errors
  let result = '';
  if (error instanceof HttpErrorResponse) {
    const response = <HttpErrorResponse>error;

    switch (response.status) {
      case 0: { // Offline
        result = `Unable to reach the server, please check the connection of your device`;
        break;
      }
      case 400: { // Bad Request  -- ServiceException from the backend
        if (error.error instanceof Blob) {
          // Need a better solution to handle blobs
          result = 'Unknown error';
        } else {
          result = error.error.errors;
        }
        break;
      }
      case 401: { // Unauthorized
        result = `Your login session has expired, please login again`;
        break;
      }
      case 403: { // Forbidden
        result = `Sorry, your account does not have sufficient permissions`;
        break;
      }
      case 404: { // Not found
        result = `Sorry, the requested resource was not found`;
        break;
      }
      case 500: { // Internal Server Error
        result = `An unhandled exception occurred on the server, please contact your IT department`;
        break;
      }
      default: { // Any other HTTP error
        result = `An unknown error has occurred while retrieving the record, please contact your IT department`;
        break;
      }
    }
  } else {
    console.error(error);
    result = `Unknown error`;
  }

  return result;
}

export function cloneModel<T>(model: T): T {
  // This technique is simple and effective for cloning model objects, these objects
  // have to be JSON friendly anyways since they travel from/to the server
  return JSON.parse(JSON.stringify(model));
}

export function downloadBlob(blob: Blob, fileName: string) {
  // Helper function to download a blob from memory to the user's computer,
  // Without having to open a new window first
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // To support IE and Edge
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {

    // Create an in memory url for the blob, further reading:
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    const url = window.URL.createObjectURL(blob);

    // Below is a trick for downloading files without opening
    // a new window. This is a more elegant user experience
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();

    // Best practice to prevent a memory leak, especially in a SPA like bSharp
    window.URL.revokeObjectURL(url);
  }
}

//////////////////////////////////
export class Utils {
  public static formatError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return 'An error occurred: ' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let msg = "Unknown error";
      if (error.error && typeof error.error === 'string') {
        msg = <string>error.error;
      }
      else if (error.message) {
        msg = error.message;
      }
      return `Backend returned code ${error.status}, ${error.error}`;
    }
  };

}

//https://stackoverflow.com/questions/38554562/how-can-i-use-ngfor-to-iterate-over-typescript-enum-as-an-array-of-strings
export function getENUM(ENUM:any): {key:any; value: any}[] {
  let myEnum : {key:any; value: any}[] = [];
  let objectEnum = Object.keys(ENUM);
  const values = objectEnum.slice( 0 , objectEnum.length / 2 );
  const keys = objectEnum.slice( objectEnum.length / 2 );

  for (let i = 0 ; i < objectEnum.length/2 ; i++ ) {
    myEnum.push( { key: keys[i], value: values[i] } ); 
  }
  return myEnum;
}