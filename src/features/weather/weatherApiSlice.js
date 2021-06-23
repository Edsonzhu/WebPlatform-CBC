import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { gql } from 'graphql-request';

/**
 * I tried to use this new method to fetch the data but it came out that it doesn't 
 * fit on our use case where the data fetched is persisted into redux 'storage'.
 * This method is good if you are fetching the data and would use in only one component.
 */

export const apiSlice = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query(city) {
        return {
          document: gql`
            query($city: String!) {
              getCityByName(name: $city) {
                id,
                name, 
                country,
                weather {
                  summary {
                    title,
                    description,
                    icon
                  },
                  temperature {
                    min,
                    max,
                    feelsLike,
                    actual,
                  }      
                }
              }
            }
          `,
          variables: {city}
        }
      },
      
      transformResponse: (response) => response.getCityByName,
    }),
  }),
});

export const { useGetWeatherQuery } = apiSlice;
