export enum Level {
    ORGANIZATION = 'organization',
    PROJECT = 'project',
    COMPONENT = 'component',
}

export interface LevelItem {
    label: string;
    id: string;
}
  
export function getLevelLabel(level: Level) {
    switch (level) {
        case Level.ORGANIZATION:
            return "Organization";
        case Level.PROJECT:
            return "Project";
        case Level.COMPONENT:
            return "Component";
        default:
            return "Unknown";
    }
}
