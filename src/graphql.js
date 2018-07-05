import Vue from 'vue';
import VueGraphQL from 'vue-graphql';

Vue.use(VueGraphQL);

const graphqlApi = 'http://localhost:3000/graphql/graphql/';

const client = new VueGraphQL.Client(graphqlApi);

export default client;
