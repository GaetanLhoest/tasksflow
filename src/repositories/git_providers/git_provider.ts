
export enum GitProvider {
    gitlab = 'gitlab',
    github = 'github',
    bitbucket = 'bitbucket',
    undefined = 'undefined'
};

export var gitProviderUrl = new Map([
    ['gitlab', 'https://gitlab.com/'],
    ['github', 'https://github.com/'],
    ['bitbucket', 'https://bitbucket.com/']
]);