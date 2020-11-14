import { GitRepository } from "../git_repository/git_repository";
import { GitProvider } from "../git_providers";
import { Issue } from "../issue";
import { Gitlab } from './gp_gitlab';


export class GitProviderRepository implements GitProvider {

    gitRepository: GitRepository;
    gitProvider?: GitProvider;

    constructor(gitRepository: GitRepository) {
        this.gitRepository = gitRepository;
        let gitProviderId = gitRepository.providerId;
        if (gitProviderId === GitProvider.gitlab) {
            this.gitProvider = new Gitlab(GitProvider.url.get(gitProviderId)!,
                gitRepository.projectId!);
        }
    }


    getIssue(id: string): Promise<Issue> {
        return this.gitProvider!.getIssue(id);
    }
    getIssueList(): Promise<Issue[]> {
        return this.gitProvider!.getIssueList();
    }



}