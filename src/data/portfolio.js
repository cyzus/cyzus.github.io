import React from 'react';

export const publications = [
  {
    title: 'SELA: Tree-Search Enhanced LLM Agents for Automated Machine Learning',
    tags: ['2024', 'Agent Search', 'AutoML'],
    authors: ['Yizhou Chi', 'Yizhang Lin', 'Sirui Hong', 'Duyi Pan', 'Yaying Fei', 'Guanghao Mei', 'Bangbang Liu', 'Tianqi Pang', 'Jacky Kwok', 'Ceyao Zhang', 'Bang Liu', 'Chenglin Wu'],
    description: 'We frame AutoML pipeline design as a tree-search problem, enabling LLM agents guided by Monte Carlo Tree Search to plan experiments, reuse past insights, and converge on strong configurations.',
    links: [
      { label: 'paper', url: 'https://arxiv.org/abs/2410.17238' },
      { label: 'code', url: 'https://github.com/FoundationAgents/MetaGPT/tree/main/metagpt/ext/sela' }
    ]
  },
  {
    title: 'THOUGHTSCULPT: Reasoning with Intermediate Revision and Search',
    tags: ['NAACL 2025', 'Reasoning'],
    authors: ['Yizhou Chi', 'Kevin Yang', 'Dan Klein'],
    description: 'We demonstrate how decomposing candidate solutions and revising them via MCTS yields state-of-the-art structured reasoning while keeping the search space inspectable.',
    links: [
      { label: 'paper', url: 'https://arxiv.org/abs/2404.05966' },
      { label: 'code', url: 'https://github.com/cyzus/thoughtsculpt' }
    ]
  },
  {
    title: 'CLARINET: Augmenting Language Models to Ask Clarification Questions for Retrieval',
    tags: ['2024', 'Retrieval'],
    authors: ['Yizhou Chi', 'Jessy Lin', 'Kevin Lin', 'Dan Klein'],
    description: 'By conditioning on retrieval distributions, CLARINET teaches LLMs to ask targeted clarification questions that reduce ambiguity and consistently outperform heuristic baselines.',
    links: [
      { label: 'paper', url: 'https://arxiv.org/abs/2405.15784' }
    ]
  },
  {
    title: 'Feature Selection of High Dimensional Data by Adaptive Potential Particle Swarm Optimization',
    tags: ['IEEE CEC 2019'],
    authors: ['Xingyue Huang', 'Yizhou Chi', 'Yu Zhou'],
    description: 'We adapt particle swarm optimization with ReliefF-driven filtering to handle small-sample, high-dimensional classification tasks more robustly than standard PSO variants.',
    links: [
      { label: 'paper', url: 'https://ieeexplore.ieee.org/abstract/document/8790366' }
    ]
  }
];

export const projects = [
  {
    title: 'Among Agents',
    status: 'ACL 2024 Workshop',
    description: 'A text-based social deduction environment for probing how language agents reason under partial information and social pressure.',
    links: [
      { label: 'paper', url: 'https://arxiv.org/abs/2407.16521' },
      { label: 'code', url: 'https://github.com/cyzus/among-agents' }
    ]
  },
  {
    title: 'Interactive Flock Simulator',
    status: 'Graphics',
    description: 'A real-time flocking visualizer that pairs physics-based animation with intuitive controls.',
    links: [
      { label: 'demo', url: 'https://tianqiyang.github.io/Interactive-Flocking-Simulation-CS-184-Final-Project/final_implementation.html' }
    ]
  }
];
