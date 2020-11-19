import { Issue } from "../issue";
import { GitProviderInterface } from "./git_provider_interface";
import { GraphQLClient, gql } from 'graphql-request';
import { URL } from "url";
import { TasksflowConfig } from '../../config/tasksflow_config';
import { GitProvider } from './git_provider';

export class Github implements GitProviderInterface {
  instanceUrl: string;
  projectId: string;
  client: GraphQLClient;
  accessToken?: string;

  constructor(instanceUrl: string, projectId: string) {
    this.accessToken = TasksflowConfig.getAccessToken(GitProvider.github);
    this.instanceUrl = instanceUrl;
    this.projectId = projectId;
    const endpoint = new URL("/graphql", this.instanceUrl).href;
    this.client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
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

    let resId = result.repository.issue?.id;
    let resNumber = result.repository.issue?.number;
    let resTitle = result.repository.issue?.title;
    let resBody = result.repository.issue?.body;
    let resLabels = result.repository.issue?.labels.nodes.map(
      (label: { name: string }) => label.name
    );
    let issue = new Issue(resId, resNumber, resTitle, resBody, resLabels);
    return issue;
  }

  async getAllIssuesList(): Promise<Issue[]> {
    let issueQuery = gql`query {
      repository(name: "slim-launcher", owner: "sduduzog") {
        createdAt
        description
        issues(first: 100,states:OPEN) {
          nodes {
            title
            body
            id
            number
            labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }`;
    const result = await this.client.request(issueQuery);
    let nodes = result.repository.issues.nodes;
    let issues: Array<Issue> = [];
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let issue = new Issue(node.id, node.number, node.title, node.body, node.labels.nodes.map(
        (label: { name: string }) => label.name
      ));
      issues.push(issue);
    }
    return issues;
  }
}
