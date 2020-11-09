import { gql, GraphQLClient } from 'graphql-request';
import { URL } from 'url';
import { Issue } from '../issue';



export class Gitlab implements GitProvider {

  instanceUrl: string;
  client: GraphQLClient;

  constructor(instanceUrl: string) {
    this.instanceUrl = instanceUrl;
    const endpoint = new URL('/api/graphql', this.instanceUrl).href;
    this.client = new GraphQLClient(endpoint);
  }


  async getIssue(id: string): Promise<Issue> {
    let issueQuery = gql`query {
            project(fullPath: "gitlab-org/gitlab-vscode-extension") {
              id,
              openIssuesCount,
              issues(iid:"${id}") {
                nodes{
                  author{
                    name
                  },
                  title,
                  description,
                  id,
                  iid,
                  labels{
                    nodes{
                      title
                    }
                  }
                }
              }
            }
          }`;
    const result = await this.client.request(issueQuery);

    let resId = result.project.issues?.nodes[0].id;
    let resTitle = result.project.issues?.nodes[0].title;
    let resBody = result.project.issues?.nodes[0].body;
    let resLabels = result.project.issues?.nodes[0].labels.nodes.map((label: { title: string; }) => label.title);
    let issue = new Issue(resId, resTitle, resBody, resLabels);
    return issue;
  }

  async getIssueList(): Promise<Issue[]> {
    throw new Error("Method not implemented.");
  }

}