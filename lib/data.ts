import { ReactNode } from 'react';

export type Category = string;

export interface Post {
    slug: string;
    title: string;
    description: string;
    content: string;
    category: Category;
    tags: string[];
    readingTime: number;
    publishedAt: string;
    featured?: boolean;
    emoji: string;
    patternType: 'dots' | 'grid' | 'circuit' | 'wave' | 'hex';
    accentColor: string;
    author: string;
    authorBio: string;
    bannerUrl?: string;
    avgRating?: number;
    score?: number;
    totalVotes?: number;
}

export const CATEGORY_COLORS: Record<Category, string> = {
    'Kubernetes': '#326CE5',
    'Terraform': '#844FBA',
    'CI/CD': '#FCA121',
    'MLOps pipelines': '#ff4d4d',
    'Infrastructure': '#10b981',
    'Cloud architecture': '#0ea5e9',
    'DevOps tooling': '#f59e0b',
    'Machine Learning Systems': '#a855f7',
    'Databricks': '#FF3621',
    'Docker': '#2496ED',
    'MLflow': '#0194E2',
    'System design': '#6366f1',
};

export const CATEGORY_BG: Record<Category, string> = {
    'Kubernetes': '#326CE515',
    'Terraform': '#844FBA15',
    'CI/CD': '#FCA12115',
    'MLOps pipelines': '#ff4d4d15',
    'Infrastructure': '#10b98115',
    'Cloud architecture': '#0ea5e915',
    'DevOps tooling': '#f59e0b15',
    'Machine Learning Systems': '#a855f715',
    'Databricks': '#FF362115',
    'Docker': '#2496ED15',
    'MLflow': '#0194E215',
    'System design': '#6366f115',
};

const defaultAuthorBio = "I build ML platforms, but some of the most real parts of me exist far away from screens. I’m deeply curious about how things work, whether it’s distributed systems, human emotions, or the quiet meaning hidden inside ordinary moments.";

export const posts: Post[] = [
    {
        slug: "understanding-kubernetes-service-types",
        title: "Understanding Kubernetes Service Types",
        description: "A deep dive into ClusterIP, NodePort, LoadBalancer, and ExternalName services, and when to use them in production systems.",
        category: "Kubernetes",
        tags: ["Kubernetes", "Networking", "Infrastructure"],
        readingTime: 6,
        publishedAt: "2024-03-12T10:00:00Z",
        featured: true,
        emoji: "☸️",
        patternType: "hex",
        accentColor: "#326CE5",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## Why Services Matter

Kubernetes Pods are ephemeral. If you rely on Pod IPs for communication, your systems will break when Pods are recreated. This is why we need **Services**. A Service provides an abstract way to expose an application running on a set of Pods.

### The 4 Types of Services

1. **ClusterIP**: The default. Exposes the Service on a cluster-internal IP. Reaching this service is only possible from within the cluster.
2. **NodePort**: Exposes the Service on each Node's IP at a static port. A \`ClusterIP\` Service, to which the \`NodePort\` Service routes, is automatically created.
3. **LoadBalancer**: Exposes the Service externally using a cloud provider's load balancer.
4. **ExternalName**: Maps the Service to the contents of the \`externalName\` field.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
\`\`\`

Understanding when to leverage an Ingress controller versus natively provisioning a Cloud \`LoadBalancer\` is essential for cost management and routing complexity in scalable architectures.
        `
    },
    {
        slug: "deployment-vs-statefulset",
        title: "Deployment vs StatefulSet",
        description: "Knowing when to use stateless Deployments vs persistent StatefulSets for databases and message queues.",
        category: "Kubernetes",
        tags: ["StatefulSet", "Architecture", "Databases"],
        readingTime: 5,
        publishedAt: "2024-02-28T14:30:00Z",
        featured: false,
        emoji: "📦",
        patternType: "grid",
        accentColor: "#326CE5",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## Stateless vs Stateful

Most applications we write to run on Kubernetes are stateless. The ideal fit for this is a **Deployment**. Deployments manage replica sets, allowing seamless rolling updates and generic scaling.

However, when dealing with distributed databases (like Cassandra or MongoDB) or message brokers (like Kafka), identity matters.

### Enter StatefulSets

StatefulSets maintain a sticky identity for each of their Pods. These pods are created from the same spec, but are not interchangeable.
- Ordered, graceful deployment and scaling.
- Ordered, automated rolling updates.
- Stable, unique network identifiers.
- Stable, persistent storage.

If your application requires these guarantees, StatefulSet is your tool. Otherwise, stick with Deployments.
        `
    },
    {
        slug: "how-mlflow-tracks-experiments",
        title: "How MLflow Tracks Experiments",
        description: "A look under the hood of MLflow Tracking to manage model experiments, metrics, and parameters.",
        category: "MLflow",
        tags: ["MLflow", "MLOps", "Python"],
        readingTime: 7,
        publishedAt: "2024-02-15T09:15:00Z",
        featured: false,
        emoji: "📊",
        patternType: "dots",
        accentColor: "#0194E2",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## Experiment Tracking

Machine learning requires experimentation. Keeping track of hyperparameter tuning, model architectures, and evaluation metrics manually is a recipe for disaster.

MLflow Tracking solves this by providing an API and UI for logging parameters, code versions, metrics, and output files.

### Concepts

- **Parameters**: Key-value inputs to your code.
- **Metrics**: Numeric values that can update over time.
- **Artifacts**: Files (e.g., models, images, data files).

\`\`\`python
import mlflow

with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.log_artifact("model.pkl")
\`\`\`

Integrating MLflow effectively ensures reproducibility across the entire Data Science lifecycle.
        `
    },
    {
        slug: "terraform-infrastructure-basics",
        title: "Terraform Infrastructure Basics",
        description: "Understanding state, providers, and modules in Infrastructure as Code.",
        category: "Terraform",
        tags: ["IaC", "Cloud", "AWS"],
        readingTime: 8,
        publishedAt: "2024-01-22T11:45:00Z",
        featured: false,
        emoji: "🏗️",
        patternType: "circuit",
        accentColor: "#844FBA",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## Infrastructure as Code

Terraform allows you to define cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share. You can then use a consistent workflow to provision and manage all of your infrastructure throughout its lifecycle.

### The Role of State

Terraform must store state about your managed infrastructure and configuration. This state is used by Terraform to map real world resources to your configuration, keep track of metadata, and to improve performance for large infrastructures.

\`\`\`hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
\`\`\`

Managing remote state securely (e.g., in S3 with DynamoDB locking) is the first critical step to building production-grade infrastructure pipelines.
        `
    },
    {
        slug: "designing-an-mlops-pipeline",
        title: "Designing an MLOps Pipeline",
        description: "Connecting data extraction, model training, evaluation, and deployment in a continuous loop.",
        category: "MLOps pipelines",
        tags: ["Pipeline", "Architecture", "CI/CD"],
        readingTime: 9,
        publishedAt: "2023-12-10T08:30:00Z",
        featured: true,
        emoji: "🔄",
        patternType: "wave",
        accentColor: "#ff4d4d",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## Automating the ML Lifecycle

MLOps is DevOps for Machine Learning. It's the practice of automating and monitoring all steps of ML system construction, including integration, testing, releasing, deployment, and infrastructure management.

### Key Components

1. **Data Pipeline**: Extraction, validation, and preparation.
2. **Training Pipeline**: Model training and hyperparameter tuning.
3. **Evaluation**: Judging model performance against a golden dataset.
4. **Model Registry**: Versioning the trained artifact.
5. **Serving**: Exposing the model via real-time API or batch inference.

A robust pipeline minimizes the time from research to production, ensuring that models don't decay silently over time.
        `
    },
    {
        slug: "debugging-distributed-systems",
        title: "Debugging Distributed Systems",
        description: "Lessons learned on tracing, logging, and finding the needle in the haystack of microservices.",
        category: "System design",
        tags: ["Distributed Systems", "Observability", "Logging"],
        readingTime: 6,
        publishedAt: "2023-11-05T15:20:00Z",
        featured: false,
        emoji: "🕵️‍♂️",
        patternType: "hex",
        accentColor: "#6366f1",
        author: "Bhawuk Arora",
        authorBio: defaultAuthorBio,
        content: `
## The Complexity of Microservices

When moving from a monolith to microservices, you trade module coupling for operational complexity. When a request fails, tracking down the offending service becomes a non-trivial task.

### The Three Pillars of Observability

- **Logs**: Distinct events that happened. Essential for granular debugging.
- **Metrics**: Numerical representations of data measured over time. Crucial for alerting.
- **Traces**: The path of a single request across multiple microservices.

Implementing distributed tracing (e.g., using OpenTelemetry and Jaeger) is non-negotiable for modern distributed environments. It transforms "something is broken" into "Service B timed out calling Database C".
        `
    }
];

export interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string | null;
    demo: string | null;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        title: "Sahayak AI",
        description: "Voice-first multilingual AI assistant helping Indian citizens access government schemes through natural conversations in Hindi & English. Built on a serverless AWS architecture with RAG-powered intent resolution across 60+ schemes.",
        tech: ["AWS Bedrock", "Lambda", "DynamoDB", "Transcribe", "Polly", "RAG", "Python"],
        github: "https://github.com/bhawuk-arora/sahayak-ai",
        demo: null,
        featured: true,
    },
    {
        title: "Aadhaar Life-Event Intelligence",
        description: "Data analytics framework that transforms anonymized Aadhaar enrolment data into societal intelligence — detecting migration patterns, employment transitions, and demographic shifts using clustering, time-series forecasting, and a custom Life-Event Probability Index (LEPI).",
        tech: ["Python", "Pandas", "Scikit-learn", "Statsmodels", "K-Means", "DBSCAN"],
        github: "https://github.com/bhawuk-arora/aadhaar-life-event-intelligence",
        demo: null,
        featured: true,
    },
    {
        title: "Marvel MLOps End-to-End",
        description: "Production-ready MLOps pipeline on Databricks — covering data processing, feature engineering, model training & registration, automated deployment, real-time monitoring, and CI/CD with GitHub Actions using Databricks Asset Bundles.",
        tech: ["Databricks", "MLflow", "PySpark", "Python", "GitHub Actions", "Feature Store"],
        github: "https://github.com/bhawuk-arora/marvel-mlops-end-to-end",
        demo: null,
        featured: true,
    },
    {
        title: "Risk-Based Aircraft Maintenance",
        description: "Full-stack predictive maintenance system with ML-driven risk scoring. Generates synthetic telemetry, predicts 30-day failure probabilities via Logistic Regression, and surfaces prioritized maintenance schedules through a React dashboard.",
        tech: ["FastAPI", "PostgreSQL", "MLflow", "React", "Docker", "Python"],
        github: "https://github.com/bhawuk-arora/risk-based-aircraft-maintenance",
        demo: null,
        featured: true,
    },
    {
        title: "Sahayak AI Backend",
        description: "High-performance FastAPI backend for Sahayak AI featuring local RAG engine with ChromaDB, PostgreSQL database, voice services for STT/TTS, and Dockerized deployment with 150+ seeded government schemes.",
        tech: ["FastAPI", "PostgreSQL", "ChromaDB", "Docker", "Python", "RAG"],
        github: "https://github.com/bhawuk-arora/sahayakai_backend",
        demo: null,
    },
    {
        title: "Databricks Bundle Sandbox",
        description: "Infrastructure sandbox for experimenting with Databricks Asset Bundles — exploring deployment pipelines, workspace configuration, and CI/CD automation for data engineering workflows.",
        tech: ["Databricks", "Python", "YAML", "CI/CD"],
        github: "https://github.com/bhawuk-arora/databricks-bundle-sandbox",
        demo: null,
    },
    {
        title: "RAG HR Chatbot",
        description: "Retrieval-Augmented Generation chatbot for HR policy queries. Uses vector embeddings to find relevant policy documents and generates contextual responses for employee questions.",
        tech: ["Python", "LangChain", "Vector DB", "RAG", "NLP"],
        github: "https://github.com/bhawuk-arora/rag_hr_chabot_mojo",
        demo: null,
    },
];

export function getPostBySlug(slug: string): Post | undefined {
    return posts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: Category, limit = 2): Post[] {
    return posts
        .filter(post => post.slug !== currentSlug && post.category === category)
        .slice(0, limit);
}
