export const typeDefs = `
    type Query{
        hello: String!
        books(filter: String, skip: Int, take: Int, orderBy: BooksOrderByInput): BooksResponse
        book (id: ID!): BookResponse
        orders(filter: String, skip: Int, take:Int, orderBy: OrdersOrderByInput): OrdersResponse
        
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
        customerId: Int 
        books: [Int]!
        
    }
    
    input BooksOrderByInput {
        pages: Sort
        price: Sort 
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

        updateBook(bookId: Int!, details: BookDetails ) : BookResponse

        addOrder(details: OrderDetails) :  OrderResponse

        updateOrder(orderId: Int!, books: [Int], statusTo: OrderStatusInput) : OrderResponse

        removeOrder(orderId: Int!): MutationResponse
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

    enum Sort {
        asc
        desc
    }

    enum OrderConditions {
        Failed 
        Successful
        Progress
    }
   
  
`

