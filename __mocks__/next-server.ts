
export class NextRequest {
  constructor(public url: string, public init?: RequestInit) {}
  headers: Record<string, string> = {};
}

export class NextResponse {
  static json(data: any, init?: ResponseInit) {
    return { json: async () => data, ...init };
  }
}
