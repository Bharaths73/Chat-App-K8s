const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const Auth={
    LOGIN_API:BASE_URL+'/auth/login',
    SIGNUP_API:BASE_URL+'/auth/signup',
    LOGOUT_API:BASE_URL+'/auth/logout',
}

export const Profile={
    UPDATE_USER_API:BASE_URL+'/profile/update',
    UPDATE_USER_IMAGE_API:BASE_URL+'/profile/update-image',
    DELETE_USER_IMAGE_API:BASE_URL+'/profile/delete-image',
}

export const Contacts={
    SEARCH_CONTACTS_API:BASE_URL+'/contacts/search-contacts',
    GET_CONTACTS_API:BASE_URL+'/contacts/get-contacts',
    GET_ALL_CONTACTS_API:BASE_URL+'/contacts/get-all-contacts'
}

export const Messages={
    GET_MESSAGES_API:BASE_URL+'/messages/get-messages',
    UPLOAD_FILE_API:BASE_URL+'/messages/upload-file',
}