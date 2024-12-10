export interface TemplateMessage {
  id?: number;
  title?: string;
  message?: string;
  storeId?: number;
}

export interface TemplateMessageType {
  data: TemplateMessage[];
}
