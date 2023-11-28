const mockCreateClient = jest.fn().mockImplementation((url: string, key: string) => ({
  url,
  key,
}));

export const supabaseMock = {
  createClient: mockCreateClient,
};
