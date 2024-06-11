Hi！

I am Yizhou Chi. 

I am currently a 5th year EECS master student @ UC Berkeley, advised by [Dan Klein](http://people.eecs.berkeley.edu/~klein/), and I just graduated with a double-major in Computer Science and Cognitive Science in Spring 2023.

My research interest centers around facilitating meaningful communication between humans and computers through language interaction. This entails developing AI systems capable of comprehending both implicit and explicit meanings conveyed by humans, maintaining long-term coherence in conversations, and continuously improving through self-correction and self-examination.


## Publications

- **THOUGHTSCULPT: Reasoning with Intermediate Revision and Search** \
<u>Yizhou Chi</u>, Kevin Yang, Dan Klein \
We present THOUGHTSCULPT, a general reasoning and search method for tasks with outputs that can be decomposed into components. THOUGHTSCULPT explores a search tree of potential solutions using Monte Carlo Tree Search (MCTS), building solutions one action at a time and evaluating according to any domain-specific heuristic, which in practice is often simply an LLM evaluator. \
[[paper]](https://arxiv.org/abs/2404.05966) [[code]](https://github.com/cyzus/thoughtsculpt)


- **CLARINET: Augmenting Language Models to Ask Clarification Questions for Retrieval** \
<u>Yizhou Chi</u>, Jessy Lin, Kevin Lin, Dan Klein \
Users often make ambiguous requests that require clarification. We study the problem of asking clarification questions in an information retrieval setting, where systems often face ambiguous search queries and it is challenging to turn the uncertainty in the retrieval model into a natural language question. We present CLARINET, a system that asks informative clarification questions by choosing questions whose answers would maximize certainty in the correct candidate. Our approach works by augmenting a large language model (LLM) to condition on a retrieval distribution, finetuning end-to-end to generate the question that would have maximized the rank of the true candidate at each turn. When evaluated on a real-world retrieval dataset of users searching for books, our system outperforms traditional heuristics such as information gain on retrieval success by 17% and vanilla-prompted LLMs by 39% relative.\
[[paper]](https://arxiv.org/abs/2405.15784)



- **Feature Selection of High Dimensional Data by Adaptive Potential Particle Swarm Optimization** \
Xingyue Huang, <u>Yizhou Chi</u>, Yu Zhou \
*2019 IEEE Congress on Evolutionary Computation (CEC)* \
We proposed an improved algorithm on Particle Swarm Optimization, capable of classifying high-dimensional data with small training samples; The proposed algorithm makes use of ReliefF to reduce irrelevant features and follows an adapted way to select cut-points based on the feature size of the dataset to achieve higher average accuracy compared to the existed PSO algorithms. \
[[paper]](https://ieeexplore.ieee.org/abstract/document/8790366)


## Others

- **Among Agents** \
The study introduces a text-based game environment, named AmongAgents, that mirrors the dynamics of "Among Us". Players act as crew members aboard a spaceship, tasked with identifying impostors who are sabotaging the ship and eliminating the crew. Within this environment, the behavior of simulated language agents is analyzed. The experiments involve diverse game sequences featuring different configurations of Crewmates and Impostor personality archetypes. Our work demonstrates that state-of-the-art large language models (LLMs) can effectively grasp the game rules and make decisions based on the current context. This work aims to promote further exploration of LLMs in goal-oriented games with incomplete information and complex action spaces, as these settings offer valuable opportunities to assess language model performance in socially driven scenarios.

[[paper]](https://openreview.net/pdf?id=F4nIkAISjn)

- **Interactive Flock Simulator** \
A 3D flock simulator that mimics the flying behaviors of birds using C++; adopted Boid algorithm as the basis of movements and implemented a GUI that allows users to interact with the birds \
[[demo site]](https://tianqiyang.github.io/Interactive-Flocking-Simulation-CS-184-Final-Project/final_implementation.html) [[github]](https://github.com/tianqiyang/Interactive-Flocking-Simulation-CS-184-Final-Project)

- **An Empirical Study on Two-child Policy in China Based on Statistical Analysis and Machine Learning** \
<u>Yizhou Chi</u>, Xingyue Huang, Yu Zhou \
Applied statistical methods to explore different factors that influence the expectancy of a second child in China. An imbalance classification model is trained using real-world data from both rural and city regions \
[[paper]](https://www.atlantis-press.com/proceedings/ssphe-18/55911795)

