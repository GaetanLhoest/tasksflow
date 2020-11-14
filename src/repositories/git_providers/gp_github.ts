import { Issue } from "../issue";
import { GitProvider } from "../git_providers";
import { GraphQLClient, gql } from 'graphql-request';
import { URL } from "url";

export class Github implements GitProvider {
  instanceUrl: string;
  projectId: string;
  client: GraphQLClient;

  constructor(instanceUrl: string, projectId: string) {
    this.instanceUrl = instanceUrl;
    this.projectId = projectId;
    const endpoint = new URL("/api/graphql", this.instanceUrl).href;
    this.client = new GraphQLClient(endpoint);
  }

  async getIssue(id: string): Promise<Issue> {
    let issueQuery = gql`query { 
      repository(name: "slim-launcher", owner:"sduduzog") { 
        createdAt,
        description,
        issue(number:46){
          title,
          body,
          id,
          number,
          labels(first:100){
            nodes{
              name
            }
          }
        }
      }
    }`;
    const result = await this.client.request(issueQuery);

    let resId = result.project.issues?.nodes[0].id;
    let resIid = result.project.issues?.nodes[0].iid;
    let resTitle = result.project.issues?.nodes[0].title;
    let resBody = result.project.issues?.nodes[0].body;
    let resLabels = result.project.issues?.nodes[0].labels.nodes.map(
      (label: { title: string }) => label.title
    );
    let issue = new Issue(resId, resIid, resTitle, resBody, resLabels);
    return issue;
  }

  async getIssueList(): Promise<Issue[]> {
    throw new Error("Method not implemented.");
  }
}
