# Next Book Store

Tech stack

- Express JS
- Apollo GraphQL
- Passport JS (Social Login & Local Login)
- Prisma ORM
- React JS (development stage)
- SQLite (for development)
- postgresql (for production)
- Stripe (development stage)

Commands

- npm run dev - to start the development server
- npm run studio - to start prisma studio

# Graphql End Point

http://localhost:5000/graphql

## Query Defs

### Books GET

Can filter by

- title
- isbn

""

    Query Book Query {
         books(filter:  "cs", take:  13, skip:  0, orderBy:  { pages:  asc  })  {
           code
           success
           message
           data {
              id
              isbn
              title
              orders {
                 id
                 books {
                    title
                  }
                 orderBy {
                   email
                 }
               }
             }
             count
           }
         }

### Book Add

    mutation addBook {
    	addBook(details:  { title:"CSS In Depth 92", pages:  990, isbn:  "1-619485-8555", price:  99  })  {
    		code
    		success
    		message
    		data  {
    			id
    			title
    			pages
    			isbn
    			price
    			views
    			orders  {
    				id
    				total
    				status
    				orderDate
    				orderBy  {
    					firstName
    					email
    				}
    			}
    		}
    	}
    }

### Book Edit

    mutation  changeTitle{
    	updateBook(bookId:  "16",details:  { title:  "PPA", price:  992})  {
    		code
    		success
    		message
    		data  {
    			title
    			pages
    			price
    			isbn
    			views
    			}
    		}
    	}

### Book Delete

    mutation deleteBook {
        removeBook(bookId:  "5"){
    	    code
    	    success
    	    message
    	    }
    	}

### Get a book

    query  SingleBook{
        book(bookId:  "8")  {
    	    code
    	    success
    	    message
    	    data  {
    		    id
    		    title
    		    views
    		    isbn
    		    price
    		    pages
    		    orders  {
    			    id
    			    orderDate
    			    orderBy  {
    				    email
    				}
    			}
    		}
    	}
     }
    }

### List Orders

Can filter by

- "id"
- "email" of customer who made the order
- status - "Successful" or "Failed" or "Progress"

"id" and "email" of customer who made the order

    query  orders($orderBy:  OrdersOrderByInput){
        orders(filter:"jw", orderBy:  { status:  Progress  })  {
    	    code
    	    success
    	    message
    	    data  {
    		    status
    		    id
    		    total
    		    books  {
    			    title
    			    isbn
    			}
    			orderBy  {
    				email
    			}
    		}
    		count
    	}
    }

### Get an Order

    query  {
        order(orderId:  "4"){
    	    code
    	    message
    	    success
    	    data{
    		    id
    		    status
    		    total
    		    orderBy{
    			    email
    			}
    			books{
    				id
    				title
    			}
    		}
    	}
    }

### Add an order

    mutation  myaddOrder{
        addOrder(customerId:  "2", books:  ["10", "12"])  {
    	    code
    	    success
    	    message
    	    data  {
    		    id
    		    orderDate
    		    total
    		    orderBy  {
    			    email
    			}
    		}
    	}
    }

### Update an order

Can be updated to

- books
- status - Progress or Failed or Successful

""

    mutation  updateOrder{
    	    updateOrder(orderId:  "clajgsr7s0000isypwko65ae2",
    		    books:["11"], statusTo:  { status:  Progress  })
    		    {
    			    success
    			    code
    			    message
    			    data  {
    				    id
    					status
    					orderBy  {
    						firstName
    						email
    					}
    					books  {
    						id
    						title
    					}
    				}
    			}
    		}

### Remote an order

    mutation  deleteOrder{
        removeOrder(orderId:  "clajgsr7s0000isypwko65ae2")
    	    {
    		    code
    		    message
    		    success
    	   }
    	}
