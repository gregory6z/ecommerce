import { shopifyClient } from "./shopify";

export const shopifySync = {
  async createCustomer(user: {
    email: string;
    firstName: string;
    lastName: string;
  }) {
    const mutation = `
      mutation createCustomer($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            fistName
            lastName
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
    try {
      const response: any = await shopifyClient.request(mutation, variables);

      if (response.customerCreate.customerUserErrors.length > 0) {
        console.error(
          "Erro ao criar cliente Shopify:",
          response.customerCreate.customerUserErrors,
        );
        return null;
      }

      return response.customerCreate.customer;
    } catch (error) {
      console.error("Erro ao executar a mutation `createCustomer`:", error);
      return null;
    }
  },

  async findCustomer(email: string) {
    const query = `
      query findCustomer($query: String!) {
        customers(first: 1, query: $query) {
          edges {
            node {
              id
              email
            }
          }
        }
      }
    `;

    const variables = { query: `email:${email}` };

    try {
      const response: any = await shopifyClient.request(query, variables);

      if (response.customers.edges.length > 0) {
        return response.customers.edges[0].node;
      }

      return null;
    } catch (error) {
      console.error("Erro ao executar a query `findCustomer`:", error);
      return null;
    }
  },

  async createOrFindCustomer(email: string) {
    try {
      const existingCustomer = await this.findCustomer(email);
      if (existingCustomer) {
        return existingCustomer;
      }

      return await this.createCustomer(email);
    } catch (error) {
      console.error("Erro ao executar `createOrFindCustomer`:", error);
      return null;
    }
  },
};
