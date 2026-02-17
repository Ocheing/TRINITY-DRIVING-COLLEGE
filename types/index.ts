
export interface Profile {
    id: string;
    email: string;
    role: 'admin' | 'student';
}

export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    image_url: string;
    is_published: boolean;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    is_published: boolean;
    created_at: string;
}

export interface Instructor {
    id: string;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    certifications: string[];
}

export interface Enrollment {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    course_id: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    image_url: string;
    type: 'image' | 'video';
    created_at: string;
}
