import { GitProviderInterface } from "./git_provider_interface";
import { GitRepository } from "../git_repository/git_repository";
import { Github } from "./gp_github";
import { Gitlab } from "./gp_gitlab";
import { Issue } from "../issue";


export class GitProvider implements GitProviderInterface {

    gitRepository?: GitRepository;
    gitProvider?: GitProviderInterface;

    static gitlab = 'gitlab';
    static github = 'github';
    static bitbucket = 'bitbucket';
    static undefined = 'undefined';


    static url = new Map([
        ['gitlab', 'https://gitlab.com/'],
        ['github', 'https://api.github.com/'],
        ['bitbucket', 'https://bitbucket.com/']
    ]);

    constructor(gitRepository: GitRepository) {
        this.gitRepository = gitRepository;
        let gitProviderId = gitRepository.providerId;
        if (gitProviderId === GitProvider.gitlab) {
            this.gitProvider = new Gitlab(GitProvider.url.get(gitProviderId)!,
                gitRepository.projectId!);
        }
        else if (gitProviderId === GitProvider.github) {
            this.gitProvider = new Github(GitProvider.url.get(gitProviderId)!, gitRepository.projectId!);
        }
    }
    getIssue(id: string): Promise<Issue> {
        return this.gitProvider!.getIssue(id);
    }
    getIssueList(): Promise<Issue[]> {
        return this.gitProvider!.getIssueList();
    }

}