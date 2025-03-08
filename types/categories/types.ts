// Single measurement structure
export interface Measurement {
  unit: string; // 'mm', 'cm', 'inch'
  type: string; // 'length', 'size', etc.
  sizes: string[]; // ['1', '2', etc.]
}

// Subcategory structure
export interface Subcategory {
  name: string; // 'short', 'long', etc.
  images: string[]; // ['necklace.png', etc.]
  videos: string[]; // ['necklace.mp4', etc.]
}

// Main category structure
export interface Category {
  _id?: string; // Optional for creation, required after saving
  name: string; // 'Necklace', etc.
  images: string[]; // ['necklace.png', etc.]
  videos: string[]; // ['necklace.mp4', etc.]
  measurements: Measurement[];
  subcategory: Subcategory[];
}

// API Request type for creating/updating category
export interface CategoryRequest {
  name: string;
  images: string[];
  videos: string[];
  measurements: Measurement[];
  subcategory: Subcategory[];
}

// API Response type
export interface CategoryResponse {
  _id: string;
  name: string;
  images: string[];
  videos: string[];
  measurements: Measurement[];
  subcategory: Subcategory[];
  createdAt?: string;
  updatedAt?: string;
}

// For handling file uploads
export interface FileObject {
  file: File | null;
  url: string;
  type: string;
}

// Form state interface (for v-model bindings)
export interface CategoryFormState {
  name: string;
  currentImages: string[];
  currentVideos: string[];
  measurements: Measurement[];
  subcategory: Subcategory[];
  selectedFiles: FileObject[];
}
