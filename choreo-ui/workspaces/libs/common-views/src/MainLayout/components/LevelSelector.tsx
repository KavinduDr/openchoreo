import { Card, CardContent } from '@open-choreo/design-system';

export enum Level {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export interface LevelSelectorProps {
  level: Level;
}

export const LevelSelector = (props: LevelSelectorProps) => {
  const { level } = props;
  return (
    <Card testId={`card-level-selector-${level}`} variant="outlined">
      <CardContent>Projects or Components</CardContent>
    </Card>
  );
};
