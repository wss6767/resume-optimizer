## 1. Architecture Design
```mermaid
flowchart LTR
    subgraph Frontend
        A["React Components"]
    end
    subgraph External Services
        B["LLM API (预留接口)"]
    end
    A -->|HTTP Request| B
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None (纯前端应用，预留LLM接口)
- Database: None

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 简历优化主页面 |

## 4. API Definitions (预留接口)
```typescript
interface ResumeOptimizationRequest {
  userType: 'fresh' | 'experienced';
  resume: string;
  jd: string;
}

interface ResumeOptimizationResponse {
  diagnosis: {
    issues: {
      title: string;
      description: string;
      suggestion: string;
    }[];
  };
  optimizedResume: string;
  matchingSuggestions: {
    overallMatch: number;
    keySkills: {
      skill: string;
      match: number;
      suggestion: string;
    }[];
    recommendations: string[];
  };
}
```

## 5. Server Architecture Diagram
不适用（纯前端应用）

## 6. Data Model
不适用（纯前端应用，无数据库）