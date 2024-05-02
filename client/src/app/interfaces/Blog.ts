export interface Blog {
        _id?: string
        title: string
        description: string
        postedBy: string
        comments?: {
            text: string
            commentedBy: string
          } []
}
