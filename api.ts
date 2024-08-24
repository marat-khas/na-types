import { Article, Dates, Order, Pagination, Accrual, UploadFile, User, Person, Organization, Reviewer } from "./common";

export type Error = {
    status: number;
    name: string;
    message: string;
    details: {};
};

export type ErrorResponse = {
    data: {};
    error: Error;
};

export type AuthRequest = {
    identifier: string;
    password: string;
};

export type AuthResponse = {
    jwt: string;
    user: User;
};

export type GetUserResponse = User;

export type UploadFileRequest = {
    /** The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3) */
    path?: string;
    /** The ID of the entry which the file(s) will be linked to */
    refId?: string;
    /** The unique ID (uid) of the model which the file(s) will be linked to (api::restaurant.restaurant) */
    ref?: string;
    /** The field of the entry which the file(s) will be precisely linked to */
    field?: string;
    files: File[];
};

export type UploadFileResponse = {
    data: UploadFile;
};

export type CreateArticleRequest = {
    data: Omit<Article['attributes'], 'categories' | 'issue' | keyof Dates> & {
        categories: number[];
        issue: number;
    };
};

export type CreateArticleResponse = {
    data: Article;
};

export type GetArticleResponse = {
    data: Article;
};

export type CreateOrderRequest = {
    data: Omit<Order['attributes'], 'article' | 'file' | 'statement' | keyof Dates> & {
        article: number;
        file: number;
        statement: number;
    };
};

export type CreateOrderResponse = {
    data: Order;
};

export type GetOrderResponse = {
    data: Order;
};

export type CreateComplexOrderRequest = {
    data: CreateArticleRequest['data'] & Omit<CreateOrderRequest['data'], 'manager' | 'date' | 'article' | 'file' | 'statement'> & {
        file: File;
        statement?: File;
    };
};

export type CreateComplexOrderResponse = {
    /** ID заказа */
    data: number;
};

export type GetAccrualsRequest = {
    page: number;
    pageSize: number;
};

export type GetAccrualsResponse = {
    accruals: Accrual[],
    balance: number;
    pagination: Pagination;
};


export type GetPersonsRequest = {};

export type GetPersonsResponse = {
    data: Person[];
};

export type GetOrganizationsRequest = {};

export type GetOrganizationsResponse = {
    data: Organization[];
};

export type CreateExternalReviewerRequest = {
    author?: number;
    surname?: string;
    firstname?: string;
    patronymic?: string;
    degree?: string;
    position?: string;
    organization?: number;
    organization_name?: string;
    city?: number
    city_name?: string;
    country?: number
    country_name?: string;
};

export type CreateExternalReviewerResponse = {
    /** ID рецензента */
    data: number;
};

export type GetReviewerRequest = {};

export type GetReviewerResponse = {
    data: Reviewer[];
};