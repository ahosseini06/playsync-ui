// Need to use the React-specific entry point to import createApi
import pluralize from 'pluralize';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const playmakerApi = createApi({
  reducerPath: 'lastmealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_DOMAIN}/api/`,
    prepareHeaders: (headers, { getState }) => {
      if(localStorage.getItem('user')){
        headers.set('Authorization', `Bearer ${(localStorage.getItem('user'))}`);
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getEntity: builder.query({
      query: (arg) => {
        const { name, id, populate } = arg;
        return `${pluralize(name.replace('_', '-'))}/${id}` + (populate ? '?populate=*' : '')
      }
    }),
    getEntities: builder.query({
      query: (arg) => {
        const { name, populate } = arg;
        let query = `${pluralize(name.replace('_', '-'))}`
        if (populate === true) {query += '?populate=*';} else {
          query+= `?populate=${populate}`
        }
        console.log(query);
        return query;
      }
    }),
    getUserEntities: builder.query({
      query: () => {
        return 'users/me'
      }
    }),
    getNestedEntities: builder.query({
      query: (arg) => {
        const { name, populate, fields } = arg;
        let query = `${pluralize(name.replace('_', '-'))}`
        if (populate) {
          query += '?populate='
          for (const field of fields) {
            query += field + '.';
          }
        }
        console.log("nested query");
        console.log(query);
        return query
      }
    }),
    getEntitiesByFields: builder.query({
      query: (arg) => {
        const { name, fields, values, relations } = arg;
        const filters = []
        for (let i = 0; i < fields.length; i++) {
          let f = fields[i]
          let v = values[i]
          let r = relations[i]
          if (r) {
            filters.push(`filters[${f}][$eq]=${v}&`)
          } else {
            filters.push(`filters[${f}][${r}][$eq]=${v}&`)
          }
        }
        return `${pluralize(name.replace('_', '-'))}?${filters.join('')}`
      }
    }),
    getEntitiesByField: builder.query({
      query: (arg) => {
        const { name, field, value, relation, populate } = arg;
        let query
        if (relation) {
          query = `${pluralize(name.replace('_', '-'))}?filters[${field}][${relation}][$eq]=${value}`
        } else {
          query = `${pluralize(name.replace('_', '-'))}?filters[${field}][$eq]=${value}`
        }
        if (populate === true) {
          query += '&populate=*'
        } else if (populate !== undefined) {
          query += '&' + populate
        }
        return query
      },
      providesTags: (result, error, arg) => [{ type: arg.name, id: 'LIST' }],
    }),
    getEntitiesByRelation: builder.query({
      query: (arg) => {
        const { name, relations, value} = arg;
        let query = `${pluralize(name.replace('_', '-'))}?filters`
        for(let i = 0; i<relations.length; i++){
          query += `[${pluralize(relations[i].replace('_', '-'))}]`
        }
        query += `[$eq]=${value}`
        console.log(query)
        return query
      },
      providesTags: (result, error, arg) => [{ type: arg.name, id: 'LIST' }],
    }),
    addEntity: builder.mutation({
      query(arg) {
        const { name, body } = arg;
        return {
          url: `${pluralize(name.replace('_', '-'))}`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => {
        let tags = [{ type: arg.name, id: 'LIST' }]
        if (arg.name === 'vote') {
          tags.push({ type: 'promise', id: 'LIST' })
        }
        if (arg.name === 'promotion') {
          tags.push({ type: 'party', id: 'LIST' })
        }
        return tags
      },
    }),
    customGet: builder.query({
      query: (url) => {
        return url;
      }
    }),
    getRating: builder.mutation({
      query(arg) {
        const { body } = arg;
        return {
          url: `generate-rating`,
          method: 'POST',
          body,
        }
      },
    }),
    updateEntity: builder.mutation({
      query(arg) {
        const { name, body, id } = arg;
        return {
          url: `${pluralize(name.replace('_', '-'))}/${id}?populate=*`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => {
        let tags = [{ type: arg.name, id: 'LIST' }]
        return tags
      },
    }),
    updateMessagesRead: builder.mutation({
      query(arg) {
        const { body } = arg;
        return {
          url: `/messages/read`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => {
        let tags = [{ type: 'message', id: 'LIST' }]
        return tags
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: `/auth/local`,
          method: 'POST',
          body,
        }
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `/auth/local/register`,
          method: 'POST',
          body: { ...body, tokens: 0 },
        }
      },
    }),
    createSession: builder.mutation({
      query(body) {
        return {
          url: `/create_checkout_session`,
          method: 'POST',
          body: { data: body },
        }
      }
    }),
    getSession: builder.mutation({
      query(body) {
        return {
          url: `/checkout_session?sessionId=${body}`,
          method: 'GET',
        }
      },
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEntityQuery,
  useGetEntitiesQuery,
  useGetUserEntitiesQuery,
  useGetNestedEntitiesQuery,
  useGetEntitiesByFieldsQuery,
  useGetEntitiesByFieldQuery,
  useGetEntitiesByRelationQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddEntityMutation,
  useCustomGetQuery,
  useGetRatingMutation,
  useUpdateEntityMutation,
  useUpdateMessagesReadMutation,
  useCreateSessionMutation,
  useGetSessionMutation
} = playmakerApi
