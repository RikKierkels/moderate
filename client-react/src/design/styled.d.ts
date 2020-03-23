import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly spacing: Spacing;
    readonly breakpoint: Breakpoint;
    readonly fontSize: FontSize;
    readonly color: Color;
    readonly app: App;
    readonly toolbar: Toolbar;
  }
}

interface Spacing {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xlg: string;
}

interface Breakpoint {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
}

interface FontSize {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xlg: string;
}

interface Color {
  readonly title: string;
  readonly font: string;
  readonly body: string;
  readonly card: string;
}

interface App {
  readonly maxWidth: string;
}

interface Toolbar {
  readonly height: string;
}
