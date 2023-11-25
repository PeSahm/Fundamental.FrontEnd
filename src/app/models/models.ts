export interface SearchSymbol {
    success: boolean
    data: SymbolDetail[]
    error: any
  }
  
  export interface SymbolDetail {
    isin: string
    tseInsCode: string
    title: string
    name: string
    marketCap: number
  }
  