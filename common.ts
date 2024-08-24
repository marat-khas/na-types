export type Dates = {
    createdAt: string; // Date
    updatedAt: string; // Date
    publishedAt?: string; // Date
}

export type Pagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

type Attributes<T> = Dates & T;

type Data<T> = {
    id: number;
    attributes: Attributes<T>;
}

type Component<T> = T & {
    id: number;
}

export type Position = 'director' | 'admin' | 'manager' | 'partner' | 'reviewer' | 'translator' | 'editor';

export type Organization = Data<{
    name: string;
    // Связать с автором
    city: {
        data: City;
    }
}>;

export type City = Data<{
    name: string;
    country: {
        data: Country;
    }
    organizations: {
        data: Organization[];
    }
}>;

export type Country = Data<{
    name: string;
    cities: {
        data: City[];
    }
}>;

export type User = Data<{
    username: string;
    email: string; // Email
    position: Position[];
    balance: number;
    surname: string;
    firstname: string;
    patronymic?: string;
    blocked: boolean; 
    confirmed: boolean; 
    reviewer_acc?: {
        data: Reviewer;
    }
}>

export type Category = Data<{
    active: boolean;
    title: string;
}>

export type Categories = {
    data: Category[] | null;
    loading: boolean;
    error: string | null;
}

export type Issue = Data<{
    articles: { data: Article[] },
    number: number;
    year: number;
    active: boolean;
    type: "print" | "online";
    acceptance_end?: string; // date
    acceptance_start?: string; // date
    layout_end?: string; // date
    layout_start?: string; // date
    mailing?: string; // date
    markup_end?: string; // date
    markup_start?: string; // date
    preparation_end?: string; // date
    preparation_start?: string; // date
    production_end?: string; // date
    production_start?: string; // date
}>

export type AuthorRefinementPrice = {
    author_edits: number;
    author_correction: number;
    author_uniqueisation: number;
};

export type EditorRefinementPrice = {
    editor_edits: number;
    editor_correction: number;
    editor_uniqueisation: number;
};

export type Price = Data<AuthorRefinementPrice & EditorRefinementPrice & {
    page: number;  
    journal_russia: number;
    journal_foreign: number;
    manager_primary: number;
    manager_secondary: number;
    manager_total: number;
}>

export type Language = 'rus' | 'eng';

export type Region = 'russia' | 'foreign';

export type Refinement = 'none' | 'edits' | 'correction' | 'uniqueisation';

export type Degree = "кандидат архитектурных наук" | 
"кандидат биологических наук" | 
"кандидат ветеринарных наук" | 
"кандидат военных наук" | 
"кандидат географических наук" | 
"кандидат геолого-минералогических наук" | 
"кандидат искусствоведения" | 
"кандидат исторических наук" | 
"кандидат медицинских наук" | 
"кандидат педагогических наук" | 
"кандидат политологических наук" | 
"кандидат психологических наук" | 
"кандидат сельскохозяйственных наук" | 
"кандидат социологических наук" | 
"кандидат технических наук" | 
"кандидат фармацевтических наук" | 
"кандидат физико-математических наук" | 
"кандидат филологических наук" | 
"кандидат философских наук" | 
"кандидат химических наук" | 
"кандидат экономических наук" | 
"кандидат юридических наук" | 
"доктор архитектурных наук" | 
"доктор биологических наук" | 
"доктор ветеринарных наук" | 
"доктор военных наук" | 
"доктор географических наук" | 
"доктор геолого-минералогических наук" | 
"доктор искусствоведения" | 
"доктор исторических наук" | 
"доктор медицинских наук" | 
"доктор педагогических наук" | 
"доктор политологических наук" | 
"доктор психологических наук" | 
"доктор сельскохозяйственных наук" | 
"доктор социологических наук" | 
"доктор технических наук" | 
"доктор фармацевтических наук" | 
"доктор физико-математических наук" | 
"доктор филологических наук" | 
"доктор философских наук" | 
"доктор химических наук" | 
"доктор экономических наук" | 
"доктор юридических наук";

export type Person = Data<{
    surname: string;
    firstname: string;
    patronymic?: string;
    elibrary_spin?: string;
    elibrary_author_id?: string;
    last_organization?: { data: Organization };
    last_position?: string;
    last_degree?: Degree;
}>

export type JobComponent = Component<{
    position: string;
    organization: {
        data: Organization;
    }
}>;

export type PersonComponent = Component<{
    author: {
        data: Person;
    };
    degree?: Degree;
    jobs: JobComponent[];
}>;

export type Reviewer = Data<{
    reviewer: PersonComponent;
    staff: boolean;
    info?: string;
    categories?: { data: Category[] };

}>;

export type ReviewComponent = Component<{
    reviewer: {
        data: Reviewer;
    }
    text?: string;
    file?: File;
    comment?: string;
}>;

export type Article = Data<{
    active: boolean;
    title_primary: string;
    abstract_primary?: string;
    keywords_primary?: string[];
    title_secondary?: string;
    abstract_secondary?: string;
    keywords_secondary?: string[];
    language: Language;
    issue: { data: Issue };
    categories: { data: Category[] },
    authors: PersonComponent[]
    review?: ReviewComponent;
}>;

export type OrderStatus = 'new' | 'declined_by_manager' | 'on_review' | 'need_work' | 'declined_by_reviewer' | 'accepted' | 'pending_payment' | 'published' | 'cancelled';
export type  ReviewStatus = 'new' | 'on_evaluation' | 'evaluated' | 'on_review' | 'reviewed';
export type PaymentStatus = 'unpaid' | 'postponed' | 'invoice' | 'paid';

export type Order = Data<{
    article: { data: Article };
    manager: { data: User };
    status: OrderStatus;
    review_status: ReviewStatus;
    payment_status: PaymentStatus;
    email: string;
    originality: number;
    plagiarism: number;
    check_result_url: string;
    pages_amount: number;
    symbols_amount: number;
    journals_amount?: number;
    region?: Region;
    addressee?: string;
    address?: string;
    discount?: string;
    refinement?: Refinement;
    note?: string;
    file: { data: UploadFile }
    statement?: { data: UploadFile }
    urgent?: boolean;
}>

export type UploadFile = Data<{
    name: string;
    alternativeText: string;
    caption: string;
    width: number; //($integer)
    height: number; //($integer)
    formats: number;
    hash: string;
    ext: string;
    mime: string;
    size: number; //($double)
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
}>

export type Accrual = Data<{
    amount: number;
    balance_after: number;
    info: string;
    user: { data: User };
}>