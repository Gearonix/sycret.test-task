export interface Certificate {
  ID: number
  TABLENAME?: string
  PRIMARYKEY?: string
  NAME: string
  DESCRIPTION?: string
  PRICE: number
  SUMMA: number
  DISCOUNT?: number
}

export interface CertificatesState {
  certificatesList: Certificate[]
  selectedCertificate: Certificate | null
  loading: boolean
  error: any
  success?: any
}

export interface FormData {
  username: string
  tel: string
  email: string
  message?: string
}
