import { FormGroup } from '@angular/forms';
import { UrlsConstants } from 'src/app/shared/constants/urls.constants';
import { FileSnippet } from 'src/app/shared/classes/file-snippet';

export class AppPeopleAddDialogModel {
    form: FormGroup;
    formSubmitted = false;
    editMode = false;
    selectedFile: FileSnippet;
    defaultImageSrc = UrlsConstants.defaultImageSrc;
    imageSource;
    defaultImage = true;
    PhotoFile = null;
    originalPhotoPath = null;
}
