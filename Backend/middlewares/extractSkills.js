const skills = [
  "Python",
  "JavaScript",
  "Java",
  "C#",
  "TypeScript",
  "Kotlin",
  "Swift",
  "Go (Golang)",
  "SQL",
  "NoSQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Oracle",
  "Redis",
  "Elasticsearch",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "SpringBoot",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "Git",
  "GitHub",
  "GitLab",
  "CI/CD",
  "Jenkins",
  "Travis CI",
  "CircleCI",
  "AWS",
  "Azure",
  "Google Cloud",
  "Firebase",
  "Heroku",
  "Netlify",
  "Vercel",
  "Serverless",
  "Microservices",
  "REST",
  "WebAssembly",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "Pandas",
  "NumPy",
  "Apache Kafka",
  "RabbitMQ",
  "Hadoop",
  "Spark",
  "IA",
  "NLP",
  "C",
  "C++",
  "PHP",
  "HTML",
  "CSS",
  "javascript",
  "scala",
  "KNN",
  "SVM",
  "XGBoost",
  "K-Means",
  "Power BI",
];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSkills(text) {
  let foundSkills = [];
  skills.forEach((skill) => {
    const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, "i");

    if (regex.test(text)) {
      foundSkills.push(skill);
    }
  });
  return foundSkills;
}

module.exports = extractSkills;
