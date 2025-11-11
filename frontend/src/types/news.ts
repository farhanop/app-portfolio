export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnailPath: string | null;
  createdAt: string;
  author?: {
    fullName: string;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  caption?: string;
  tags?: string[];
}

// Tipe untuk respon list dari API (biasanya ada meta pagination, tapi kita sederhanakan dulu)
export interface NewsListResponse {
  data: NewsItem[];
  total: number;
}
