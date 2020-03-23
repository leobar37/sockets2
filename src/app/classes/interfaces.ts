export interface  ImensajeBa{
    de ?: string,
    para ?:string,
    mensaje ?:string,
    sala?:string,
    date ? :number,
    estado ? :boolean
  }
  export interface IconversacionBa{
    idConversacion ?:string,
    mensajes ?:ImensajeBa[]
  }
