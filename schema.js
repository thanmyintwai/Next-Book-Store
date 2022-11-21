export const typeDefs = `
    type Query{
        hello: String!
        books(filter: String, skip: Int, take: Int, orderBy: BooksOrderByInput): BooksResponse
        book (bookId: String!): BookResponse
        orders(filter: String, skip: Int, take:Int, orderBy: OrdersOrderByInput): OrdersResponse
        order(orderId: String!): OrderResponse
    }
    type Book{
        id: ID!
        title: String! 
        pages: Int
        isbn: String!
        price: Int
        orders: [Order!]
        views: Int 
    }
    type Customer {
        id: ID!
        firstName: String 
        lastName: String 
        email: String 
        address: String 
        postCode: Int
        city: String 
        associatedOrders: [Order!]

    }
    type Order {
        id: ID!
        orderDate: String
        status: String 
        total: Int
        orderBy: Customer
        books: [Book!]!
    }

  

    input CustomerDetails {
        firstName: String
        lastName: String
        email: String 
        address: String 
        postCode: Int
        country: String
    }
    input BookDetails {
        title: String 
        pages: Int 
        isbn: String 
        price: Int

    }

    input OrderDetails {
        customerId: String!
        books: [String]!
        
    }
    
    input BooksOrderByInput {
        pages: SortBy
        price: SortBy 
    }

    input OrdersOrderByInput {
        status: OrderConditions
    }

    
    input OrderStatusInput {
        status: OrderConditions
    }
   

    type Mutation {
        logout: Boolean
       
        addBook(details: BookDetails ) : BookResponse

        updateBook(bookId: String!, details: BookDetails ) : BookResponse

        removeBook(bookId: String!) : MutationResponse 

        addOrder(customerId: String!, books: [String!]!) :  OrderResponse

        updateOrder(orderId: String!, books: [String], statusTo: OrderStatusInput) : OrderResponse

        removeOrder(orderId: String!): MutationResponse
    }

  

    type BookResponse {
        code: String!
        success: Boolean!
        message: String!
        data: Book
      }
    type BooksResponse {
        code: String!
        success: Boolean!
        message: String!
        data: [Book]
        count: Int
    }

      type OrderResponse{
        code: String!
        success: Boolean!
        message: String!
        data: Order
      }

    type OrdersResponse {
        code: String!
        success: Boolean!
        message: String!
        data: [Order]
        count: Int 
    }

    type MutationResponse {
        code: String!
        success: Boolean!
        message: String!
       
      }

    enum UpdateOperations {
        ADD
        REMOVE 
    }

    enum SortBy {
        asc
        desc
    }

    enum OrderConditions {
        Failed 
        Successful
        Progress
    }
   
  
`

