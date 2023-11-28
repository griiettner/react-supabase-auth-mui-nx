import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  moduleNameMapper: {
    '^@supabase/supabase-js$': '<rootDir>/libs/utils/src/mocks/supabaseMock.ts',
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
};
