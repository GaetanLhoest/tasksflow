import { GitRepository } from "./git_repository/git_repository";
import { Issue } from "./issue";

export abstract class GitProvider {
  static gitlab = 'gitlab';
  static github = 'github';
  static bitbucket = 'bitbucket';
  static undefined = 'undefined';

  static url = new Map([
    ['gitlab', 'https://gitlab.com/'],
    ['github', 'https://github.com/'],
    ['bitbucket', 'https://bitbucket.com/']
  ]);

  gitRepository: GitRepository;

  constructor(gitRepository: GitRepository) {
    this.gitRepository = gitRepository;
    let gitProviderId = gitRepository.providerId;
    if (gitProviderId === GitProvider.gitlab) {
      this.gitProvider = new Gitlab(GitProvider.url.get(gitProviderId)!,
        gitRepository.projectId!);
    }
  }

  abstract async getIssue(id: string): Promise<Issue>;
  abstract async getIssueList(): Promise<Issue[]>;
}
