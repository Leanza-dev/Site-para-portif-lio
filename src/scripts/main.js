gsap.registerPlugin(ScrollTrigger);

// ─── MATRIX SCRAMBLE REVEAL EFFECT (Premium Cybernetic Interaction) ─────────
class ScrambleTextEffect {
    constructor(element) {
        this.element = element;
        this.i18nKey = element.getAttribute('data-i18n');
        this.chars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        this.isAnimating = false;
        
        this.updateTexts();

        window.addEventListener('langchange', () => {
            setTimeout(() => {
                this.updateTexts();
                if (this.isInViewport()) {
                    this.scramble();
                } else {
                    this.element.innerHTML = this.originalText;
                }
            }, 50);
        });

        this.initScrollTrigger();
    }

    updateTexts() {
        if (this.i18nKey && window.I18n) {
            const val = window.I18n.t(this.i18nKey);
            this.originalText = val.replace(/\n/g, '<br>');
            // Extrair texto limpo sem tags HTML (como <br>) para embaralhar
            const temp = document.createElement('div');
            temp.innerHTML = this.originalText;
            this.cleanText = temp.innerText;
        } else {
            this.originalText = this.element.innerHTML;
            this.cleanText = this.element.innerText;
        }
    }

    isInViewport() {
        const rect = this.element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    initScrollTrigger() {
        ScrollTrigger.create({
            trigger: this.element,
            start: "top 85%",
            onEnter: () => this.scramble(),
            once: false
        });
    }

    scramble() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        let frame = 0;
        const totalFrames = 30;
        const interval = 25; // ms per frame
        
        const timer = setInterval(() => {
            let output = '';
            let complete = 0;
 
            for (let i = 0; i < this.cleanText.length; i++) {
                const char = this.cleanText[i];
                if (char === ' ' || char === '\n' || char === '\r') {
                    output += char;
                    complete++;
                    continue;
                }

                const startFrame = (i / this.cleanText.length) * (totalFrames * 0.6);
                if (frame >= startFrame + 8) {
                    output += char;
                    complete++;
                } else if (frame >= startFrame) {
                    output += `<span style="color: var(--brand-cyan); text-shadow: 0 0 8px var(--brand-cyan); opacity: 0.9;">${this.chars[Math.floor(Math.random() * this.chars.length)]}</span>`;
                } else {
                    output += `<span style="opacity: 0.15;">${this.chars[Math.floor(Math.random() * this.chars.length)]}</span>`;
                }
            }

            this.element.innerHTML = output;

            if (complete === this.cleanText.length || frame >= totalFrames) {
                clearInterval(timer);
                this.element.innerHTML = this.originalText;
                this.isAnimating = false;
            }
            frame++;
        }, interval);
    }
}


// -----------------------------------------
// DYNAMIC PROJECT INJECTORS
// -----------------------------------------
const ProjectInjectors = {
    raftkv: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">src/raft/core.rs</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="rust-kw">impl</span> RaftNode {</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code">    <span class="rust-kw">pub fn</span> <span class="rust-fn">append_entries</span>(&<span class="rust-kw">mut</span> <span class="rust-kw">self</span>, req: AppendEntriesReq) -> Result&lt;AppendEntriesResp, Error&gt; {</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">        <span class="rust-kw">let</span> <span class="rust-kw">mut</span> state = <span class="rust-kw">self</span>.state.write().<span class="rust-macro">unwrap!</span>();</span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">        </span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">        <span class="rust-comment">// 1. Reply false if term < currentTerm</span></span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">        <span class="rust-kw">if</span> req.term < state.current_term {</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">            <span class="rust-kw">return</span> <span class="rust-type">Ok</span>(AppendEntriesResp { success: <span class="rust-type">false</span>, term: state.current_term });</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code">        }</span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code">        </span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">        <span class="rust-comment">// Reset election timer</span></span></div>
<div class="code-line"><span class="line-num">11</span><span class="line-code">        <span class="rust-kw">self</span>.election_timer.reset();</span></div>
<div class="code-line"><span class="line-num">12</span><span class="line-code">        state.current_term = req.term;</span></div>
<div class="code-line"><span class="line-num">13</span><span class="line-code">        state.role = <span class="rust-type">Role::Follower</span>;</span></div>
<div class="code-line"><span class="line-num">14</span><span class="line-code">        </span></div>
<div class="code-line"><span class="line-num">15</span><span class="line-code">        <span class="rust-comment">// Append new entries</span></span></div>
<div class="code-line"><span class="line-num">16</span><span class="line-code">        <span class="rust-kw">for</span> entry <span class="rust-kw">in</span> req.entries {</span></div>
<div class="code-line"><span class="line-num">17</span><span class="line-code">            state.log.push(entry);</span></div>
<div class="code-line"><span class="line-num">18</span><span class="line-code">        }</span></div>
<div class="code-line"><span class="line-num">19</span><span class="line-code">        </span></div>
<div class="code-line"><span class="line-num">20</span><span class="line-code">        <span class="rust-type">Ok</span>(AppendEntriesResp { success: <span class="rust-type">true</span>, term: state.current_term })</span></div>
<div class="code-line"><span class="line-num">21</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">22</span><span class="line-code">}</span></div>
                    </div>
                </div>
                <div class="live-terminal">
                    <div class="window-header">node-3-stdout</div>
                    <div class="terminal-content" id="raft-logs">
                    </div>
                </div>
            </div>
        `;
        
        const logsContainer = document.getElementById('raft-logs');
        if(!logsContainer) return;
        
        const logs = [
            { text: "Node 3 initialized. Role: Follower.", class: "log-info" },
            { text: "Listening on 0.0.0.0:8003", class: "log-info" },
            { text: "Heartbeat timeout elapsed.", class: "log-warn" },
            { text: "Transitioning to Candidate. Incrementing term.", class: "log-warn" },
            { text: "Requesting votes from [Node 1, Node 2]...", class: "log-info" },
            { text: "Received vote from Node 1.", class: "log-success" },
            { text: "Received vote from Node 2.", class: "log-success" },
            { text: "Quorum reached. Transitioning to LEADER.", class: "log-success" },
            { text: "Broadcasting AppendEntries (Heartbeat) to all nodes.", class: "log-info" },
            { text: "Replicating log index 42...", class: "log-info" },
        ];
        
        let delay = 1.0;
        logs.forEach((log, index) => {
            const el = document.createElement('div');
            el.className = 'log-line';
            el.innerHTML = `<span class="log-time">[${new Date().toISOString().substring(11, 23)}]</span> <span class="${log.class}">${log.text}</span>`;
            logsContainer.appendChild(el);
            
            gsap.to(el, { opacity: 1, y: 0, duration: 0.3, delay: delay + (index * 0.8), ease: "power2.out", onStart: () => {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }});
        });
    },
    gigamq: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">internal/engine/dispatcher.go</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="go-kw">func</span> (d *Dispatcher) <span class="go-fn">Start</span>() {</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code">    <span class="go-kw">for</span> {</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">        <span class="go-kw">select</span> {</span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">        <span class="go-kw">case</span> msg := &lt;-d.Inbound:</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">            <span class="go-comment">// Dispatch to workers using fan-out</span></span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">            worker := d.Pool.GetFree()</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">            <span class="go-kw">go</span> d.<span class="go-fn">process</span>(worker, msg)</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code">        <span class="go-kw">case</span> &lt;-d.Quit:</span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code">            <span class="go-kw">return</span></span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">        }</span></div>
<div class="code-line"><span class="line-num">11</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">12</span><span class="line-code">}</span></div>
                    </div>
                </div>
                <div class="queue-monitor">
                    <div class="window-header">live-queue-metrics</div>
                    <div class="queue-stats">
                        <div class="stat-box">
                            <div class="stat-label">Throughput</div>
                            <div class="stat-value" id="tp-val">0 msg/s</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">Latency</div>
                            <div class="stat-value" id="lt-val">0.0ms</div>
                        </div>
                    </div>
                    <div class="queue-visual" id="queue-visual">
                        <!-- Particles will be injected here -->
                    </div>
                </div>
            </div>
        `;

        const visual = document.getElementById('queue-visual');
        const tpVal = document.getElementById('tp-val');
        const ltVal = document.getElementById('lt-val');
        if(!visual) return;

        // Simulate live metrics
        setInterval(() => {
            if(!document.getElementById('queue-visual')) return;
            tpVal.innerText = (Math.random() * 5000 + 15000).toFixed(0) + " msg/s";
            ltVal.innerText = (Math.random() * 0.5 + 0.1).toFixed(2) + "ms";
        }, 1000);

        // Animate particles
        const createParticle = () => {
            if(!document.getElementById('queue-visual')) return;
            const p = document.createElement('div');
            p.className = 'message-particle';
            p.innerText = "MSG";
            p.style.left = "-50px";
            p.style.top = (Math.random() * 60 + 20) + "%";
            visual.appendChild(p);

            gsap.to(p, {
                left: "110%",
                duration: Math.random() * 1 + 0.5,
                ease: "power1.in",
                onComplete: () => p.remove()
            });

            setTimeout(createParticle, Math.random() * 300 + 100);
        };
        createParticle();
    },
    sagacommerce: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">OrderSagaCoordinator.java</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="java-anno">@Service</span></span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code"><span class="java-kw">public class</span> <span class="java-type">OrderSaga</span> {</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">    <span class="java-anno">@SagaStart</span></span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">    <span class="java-kw">public void</span> <span class="java-fn">handleOrder</span>(<span class="java-type">OrderEvent</span> event) {</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">        <span class="java-comment">// Orchestrate across microservices</span></span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">        paymentClient.<span class="java-fn">reserve</span>(event.total());</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">        inventoryClient.<span class="java-fn">deduct</span>(event.items());</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code"></span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">    <span class="java-anno">@Compensate</span></span></div>
<div class="code-line"><span class="line-num">11</span><span class="line-code">    <span class="java-kw">public void</span> <span class="java-fn">rollbackPayment</span>() {</span></div>
<div class="code-line"><span class="line-num">12</span><span class="line-code">        paymentClient.<span class="java-fn">refund</span>();</span></div>
<div class="code-line"><span class="line-num">13</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">14</span><span class="line-code">}</span></div>
                    </div>
                </div>
                <div class="saga-visualizer">
                    <div class="window-header">distributed-transaction-monitor</div>
                    <div class="saga-steps">
                        <div class="saga-step" id="saga-step-1">
                            <div class="step-node">1</div>
                            <div class="step-label">Order</div>
                        </div>
                        <div class="saga-step" id="saga-step-2">
                            <div class="step-node">2</div>
                            <div class="step-label">Payment</div>
                        </div>
                        <div class="saga-step" id="saga-step-3">
                            <div class="step-node">3</div>
                            <div class="step-label">Inventory</div>
                        </div>
                        <div class="saga-step" id="saga-step-4">
                            <div class="step-node">4</div>
                            <div class="step-label">Complete</div>
                        </div>
                    </div>
                    <div class="saga-console" id="saga-console"></div>
                </div>
            </div>
        `;

        const consoleEl = document.getElementById('saga-console');
        const steps = [
            document.getElementById('saga-step-1'),
            document.getElementById('saga-step-2'),
            document.getElementById('saga-step-3'),
            document.getElementById('saga-step-4')
        ];

        const log = (msg, color = "#fff") => {
            const div = document.createElement('div');
            div.style.color = color;
            div.style.marginBottom = "4px";
            div.innerText = `> ${msg}`;
            consoleEl.prepend(div);
        };

        const runSimulation = async () => {
            if(!document.getElementById('saga-console')) return;
            
            // Reset
            steps.forEach(s => s.classList.remove('active', 'success', 'fail'));
            consoleEl.innerHTML = "";

            // Step 1: Order
            log("Iniciando Saga: Pedido #9842 recebido.", "#61afef");
            steps[0].classList.add('active');
            await new Promise(r => setTimeout(r, 1000));
            steps[0].classList.add('success');

            // Step 2: Payment
            log("Reservando fundos no Microserviço de Pagamento...");
            steps[1].classList.add('active');
            await new Promise(r => setTimeout(r, 1200));
            steps[1].classList.add('success');

            // Step 3: Inventory (FAIL simulation)
            log("Verificando estoque...", "#e5c07b");
            steps[2].classList.add('active');
            await new Promise(r => setTimeout(r, 1000));
            
            const fail = Math.random() > 0.5;
            if(fail) {
                log("ERRO: Item fora de estoque!", "#e06c75");
                steps[2].classList.add('fail');
                await new Promise(r => setTimeout(r, 800));
                log("Iniciando COMPENSAÇÃO (Rollback)...", "#c678dd");
                await new Promise(r => setTimeout(r, 1000));
                log("Pagamento estornado com sucesso.", "#98c379");
                steps[1].classList.remove('success');
                steps[1].classList.add('fail');
            } else {
                log("Estoque confirmado.", "#98c379");
                steps[2].classList.add('success');
                await new Promise(r => setTimeout(r, 800));
                log("SAGA FINALIZADA COM SUCESSO.", "#98c379");
                steps[3].classList.add('success');
            }

            setTimeout(runSimulation, 4000);
        };

        runSimulation();
    },
    gigacloud: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">LambdaHandler.ts</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="java-anno">export const</span> <span class="java-fn">handler</span> = <span class="java-kw">async</span> (event: <span class="java-type">CloudEvent</span>) => {</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code">    <span class="java-kw">const</span> logger = <span class="java-kw">new</span> <span class="java-type">CloudLogger</span>();</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">    </span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">    <span class="java-kw">try</span> {</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">        <span class="java-kw">const</span> res = <span class="java-kw">await</span> compute.<span class="java-fn">execute</span>(event.payload);</span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">        <span class="java-kw">return</span> { statusCode: <span class="rust-num">200</span>, body: res };</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">    } <span class="java-kw">catch</span> (err) {</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code">        <span class="java-kw">await</span> logger.<span class="java-fn">logError</span>(err);</span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code">        <span class="java-kw">throw</span> err;</span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">11</span><span class="line-code">};</span></div>
                    </div>
                </div>
                <div class="queue-monitor">
                    <div class="window-header">cloud-node-scaling-monitor</div>
                    <div class="queue-stats">
                        <div class="stat-box">
                            <div class="stat-label">Active Nodes</div>
                            <div class="stat-value" id="nodes-val">12</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">Global Traffic</div>
                            <div class="stat-value" id="traffic-val">840 req/m</div>
                        </div>
                    </div>
                    <div class="queue-visual" id="cloud-visual" style="display:grid; grid-template-columns: repeat(6, 1fr); gap: 10px; align-content: center; padding: 20px;">
                        <!-- Nodes will be injected here -->
                    </div>
                </div>
            </div>
        `;

        const visual = document.getElementById('cloud-visual');
        const nodesVal = document.getElementById('nodes-val');
        const trafficVal = document.getElementById('traffic-val');
        if(!visual) return;

        const renderNodes = (count) => {
            visual.innerHTML = "";
            for(let i=0; i<count; i++) {
                const node = document.createElement('div');
                node.style.height = "10px";
                node.style.background = "var(--brand-cyan)";
                node.style.borderRadius = "2px";
                node.style.boxShadow = "0 0 10px var(--brand-cyan)";
                visual.appendChild(node);
                gsap.from(node, { scaleX: 0, duration: 0.4, delay: i * 0.05 });
            }
        };

        let currentNodes = 12;
        renderNodes(currentNodes);

        setInterval(() => {
            if(!document.getElementById('cloud-visual')) return;
            const diff = Math.floor(Math.random() * 5) - 2;
            currentNodes = Math.max(5, Math.min(36, currentNodes + diff));
            nodesVal.innerText = currentNodes;
            trafficVal.innerText = (Math.random() * 500 + 500).toFixed(0) + " req/m";
            renderNodes(currentNodes);
        }, 2000);
    },
    aurabalancer: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">core/balancer.cpp</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="cpp-kw">template</span>&lt;<span class="cpp-kw">typename</span> <span class="cpp-type">Strategy</span>&gt;</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code"><span class="cpp-kw">class</span> <span class="cpp-type">LoadBalancer</span> {</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code"><span class="cpp-kw">public</span>:</span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">    <span class="cpp-type">void</span> <span class="cpp-fn">route</span>(<span class="cpp-type">Packet</span>* <span class="cpp-ptr">pkt</span>) {</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">        <span class="cpp-kw">auto</span> target = strategy_.<span class="cpp-fn">next</span>();</span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">        target-&gt;<span class="cpp-fn">forward</span>(pkt);</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">    }</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code"><span class="cpp-kw">private</span>:</span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code">    <span class="cpp-type">Strategy</span> strategy_;</span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">};</span></div>
                    </div>
                </div>
                <div class="balancer-visualizer" id="balancer-visualizer">
                    <div class="balancer-core">AURA</div>
                    <div class="balancer-servers">
                        <div class="server-node" id="srv-1">SRV-AP-1</div>
                        <div class="server-node" id="srv-2">SRV-AP-2</div>
                        <div class="server-node" id="srv-3">SRV-EU-1</div>
                        <div class="server-node" id="srv-4">SRV-US-1</div>
                    </div>
                </div>
            </div>
        `;

        const visualizer = document.getElementById('balancer-visualizer');
        const core = visualizer.querySelector('.balancer-core');
        const servers = [
            document.getElementById('srv-1'),
            document.getElementById('srv-2'),
            document.getElementById('srv-3'),
            document.getElementById('srv-4')
        ];

        let nextServer = 0;

        const sendPacket = () => {
            if(!document.getElementById('balancer-visualizer')) return;

            const packet = document.createElement('div');
            packet.className = 'packet';
            visualizer.appendChild(packet);

            const coreRect = core.getBoundingClientRect();
            const visRect = visualizer.getBoundingClientRect();
            
            const startX = coreRect.left - visRect.left + coreRect.width / 2;
            const startY = coreRect.top - visRect.top + coreRect.height / 2;

            const target = servers[nextServer];
            const targetRect = target.getBoundingClientRect();
            const endX = targetRect.left - visRect.left + targetRect.width / 2;
            const endY = targetRect.top - visRect.top + targetRect.height / 2;

            gsap.set(packet, { x: startX, y: startY });
            
            const tl = gsap.timeline({
                onComplete: () => {
                    packet.remove();
                    target.classList.add('active');
                    setTimeout(() => target.classList.remove('active'), 200);
                }
            });

            tl.to(packet, {
                x: endX,
                y: endY,
                duration: 0.6,
                ease: "power2.in"
            });

            nextServer = (nextServer + 1) % servers.length;
            setTimeout(sendPacket, 400);
        };

        sendPacket();
    },
    skatetech: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">src/screens/SpotFeed.tsx</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="react-kw">export const</span> <span class="java-fn">SpotFeed</span> = () => {</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code">  <span class="react-kw">const</span> { spots } = <span class="java-fn">useSpots</span>();</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">  </span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">  <span class="react-kw">return</span> (</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">    <span class="react-tag">&lt;Animated.FlatList</span></span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">      <span class="react-attr">data</span>={spots}</span></div>
<div class="code-line"><span class="line-num">7</span><span class="line-code">      <span class="react-attr">renderItem</span>={({item}) => (</span></div>
<div class="code-line"><span class="line-num">8</span><span class="line-code">        <span class="react-tag">&lt;SpotCard</span> <span class="react-attr">data</span>={item} <span class="react-tag">/&gt;</span></span></div>
<div class="code-line"><span class="line-num">9</span><span class="line-code">      )}</span></div>
<div class="code-line"><span class="line-num">10</span><span class="line-code">      <span class="react-attr">contentContainerStyle</span>={styles.list}</span></div>
<div class="code-line"><span class="line-num">11</span><span class="line-code">    <span class="react-tag">/&gt;</span></span></div>
<div class="code-line"><span class="line-num">12</span><span class="line-code">  );</span></div>
<div class="code-line"><span class="line-num">13</span><span class="line-code">};</span></div>
                    </div>
                </div>
                <div class="mobile-emulator">
                    <div class="phone-frame">
                        <div class="phone-screen" id="phone-feed">
                            <div class="phone-card">
                                <div class="phone-user"><div class="phone-avatar"></div><div class="phone-line"></div></div>
                                <div class="phone-card-img"></div>
                            </div>
                            <div class="phone-card">
                                <div class="phone-user"><div class="phone-avatar" style="background:var(--brand-cyan)"></div><div class="phone-line"></div></div>
                                <div class="phone-card-img"></div>
                            </div>
                            <div class="phone-card">
                                <div class="phone-user"><div class="phone-avatar"></div><div class="phone-line"></div></div>
                                <div class="phone-card-img"></div>
                            </div>
                             <div class="phone-card">
                                <div class="phone-user"><div class="phone-avatar" style="background:var(--brand-cyan)"></div><div class="phone-line"></div></div>
                                <div class="phone-card-img"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const feed = document.getElementById('phone-feed');
        if(!feed) return;

        // Reset scroll
        feed.scrollTop = 0;

        // Custom smooth scroll loop using GSAP for better control
        const runScroll = () => {
            if(!document.getElementById('phone-feed')) return;
            
            gsap.to(feed, {
                scrollTop: feed.scrollHeight - feed.clientHeight,
                duration: 15,
                ease: "none",
                onComplete: () => {
                    gsap.to(feed, {
                        scrollTop: 0,
                        duration: 2,
                        delay: 1,
                        ease: "power2.inOut",
                        onComplete: runScroll
                    });
                }
            });
        };

        runScroll();
    },
    showroom: (stageElement) => {
        stageElement.innerHTML = `
            <div class="raft-stage">
                <div class="code-window">
                    <div class="window-header">performance-audit.tsx</div>
                    <div class="code-content">
<div class="code-line"><span class="line-num">1</span><span class="line-code"><span class="react-kw">export const</span> <span class="java-fn">Config</span> = {</span></div>
<div class="code-line"><span class="line-num">2</span><span class="line-code">  <span class="react-attr">lighthouse</span>: <span class="react-str">'optimized'</span>,</span></div>
<div class="code-line"><span class="line-num">3</span><span class="line-code">  <span class="react-attr">imageFormat</span>: [<span class="react-str">'webp'</span>, <span class="react-str">'avif'</span>],</span></div>
<div class="code-line"><span class="line-num">4</span><span class="line-code">  <span class="react-attr">cdn</span>: <span class="react-kw">true</span>,</span></div>
<div class="code-line"><span class="line-num">5</span><span class="line-code">  <span class="react-attr">compression</span>: <span class="react-str">'brotli'</span></span></div>
<div class="code-line"><span class="line-num">6</span><span class="line-code">};</span></div>
                    </div>
                </div>
                <div class="queue-monitor" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;">
                    <div class="window-header">real-world-deployment</div>
                    <div style="text-align:center;">
                        <div id="score-circle" style="width:140px; height:140px; border-radius:50%; border:8px solid #00ce7c; display:flex; align-items:center; justify-content:center; font-size:3.5rem; font-family:var(--font-black); color:#00ce7c; margin:0 auto 10px; box-shadow: 0 0 30px rgba(0, 206, 124, 0.2);">0</div>
                        <div class="font-mono" style="color:#00ce7c; font-size:0.8rem; letter-spacing:2px; margin-bottom: 20px;">PERFORMANCE AUDIT 100/100</div>
                        
                        <a href="https://showroom-velocidade.vercel.app/" target="_blank" class="explore-btn" style="text-decoration:none; display:inline-block; padding: 12px 30px; background: rgba(0,206,124,0.1); border: 1px solid #00ce7c; color: #00ce7c; font-family: var(--font-black); font-size: 0.8rem; letter-spacing: 2px; border-radius: 4px; transition: 0.3s;">
                            VISITAR SITE AO VIVO
                        </a>
                    </div>
                </div>
            </div>
        `;

        const scoreCircle = document.getElementById('score-circle');
        if(!scoreCircle) return;

        gsap.to({val:0}, {
            val: 100,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: function() {
                scoreCircle.innerText = Math.floor(this.targets()[0].val);
            }
        });
    }
};


function wrapCharacters(selector) {
    document.querySelectorAll(selector).forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.classList.add('char');
            el.appendChild(span);
        });
    });
}

// 1. CURSOR CIRÚRGICO (Velocidade do ring aumentada de 0.25 pra 0.1)
class TacticalCursor {
    constructor() {
        this.cursor = document.getElementById('tactical-cursor');
        if(!this.cursor) return;
        this.dot = this.cursor.querySelector('.cursor-dot');
        this.ring = this.cursor.querySelector('.cursor-crosshair');
        
        // Ponto segue o mouse instantaneamente
        this.xToDot = gsap.quickTo(this.dot, "x", { duration: 0, ease: "none" });
        this.yToDot = gsap.quickTo(this.dot, "y", { duration: 0, ease: "none" });
        // O anel agora também segue sem delay (a pedido do usuário para tirar o rastro estranho)
        this.xToRing = gsap.quickTo(this.ring, "x", { duration: 0, ease: "none" });
        this.yToRing = gsap.quickTo(this.ring, "y", { duration: 0, ease: "none" });

        window.addEventListener('mousemove', (e) => {
            this.xToDot(e.clientX); this.yToDot(e.clientY);
            this.xToRing(e.clientX); this.yToRing(e.clientY);
        });

        document.querySelectorAll('.interactive-target, a, article').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hover-engaged'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hover-engaged'));
        });
    }
}

// 2. FLUID AURA ENGINE (Vibe Antigravity - Orbes Fluidos e Misteriosos)
class FluidAuraEngine {
    constructor() {
        this.canvas = document.getElementById('kinetic-mesh-engine');
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.orbs = [];
        this.mouse = { x: window.innerWidth/2, y: window.innerHeight/2, active: false };
        this.init();
        
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.active = true;
        });
        window.addEventListener('mouseout', () => this.mouse.active = false);
    }

    init() {
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
        this.orbs = [];
        
        // Criar grandes orbes de cores profundas (Vibe Antigravity)
        // Cores suaves para Light Mode
        const colors = [
            'rgba(124, 58, 237, 0.1)',  // Light Purple
            'rgba(6, 182, 212, 0.1)',   // Light Cyan
            'rgba(243, 244, 246, 0.5)', // Grayish
            'rgba(16, 185, 129, 0.08)', // Soft Emerald
            'rgba(124, 58, 237, 0.05)'  // Very Light Purple
        ];

        for (let i = 0; i < 5; i++) {
            this.orbs.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                radius: Math.random() * 300 + 400,
                color: colors[i % colors.length]
            });
        }

        // Partículas soltas (Poeira estelar interativa)
        this.particles = [];
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                baseRadius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    render() {
        if(!this.ctx) return;
        this.ctx.clearRect(0, 0, this.w, this.h);
        
        this.orbs.forEach((orb, i) => {
            orb.x += orb.vx;
            orb.y += orb.vy;

            // Rebate nas bordas (com margem)
            if (orb.x < -orb.radius) orb.vx *= -1;
            if (orb.x > this.w + orb.radius) orb.vx *= -1;
            if (orb.y < -orb.radius) orb.vy *= -1;
            if (orb.y > this.h + orb.radius) orb.vy *= -1;

            // Gradiente radial
            let gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');

            // Blend multiply para criar aquele efeito translúcido no fundo branco
            this.ctx.globalCompositeOperation = 'multiply';
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Desenhar partículas
        this.ctx.globalCompositeOperation = 'multiply';
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Warp edges
            if (p.x < 0) p.x = this.w;
            if (p.x > this.w) p.x = 0;
            if (p.y < 0) p.y = this.h;
            if (p.y > this.h) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`; // Darker cyan for light background
            this.ctx.fill();
        });
    }
}

// 3. ORQUESTRADOR E ANIMAÇÕES GSAP
class EliteOrchestrator {
    constructor() {
        wrapCharacters('.split-text');
        
        this.cursor = new TacticalCursor();
        this.mesh = new FluidAuraEngine();
        
        // Activating Matrix Scramble Reveals automatically on standard headings and taglines
        document.querySelectorAll('h2.text-huge, .tagline.text-cyan').forEach(el => {
            new ScrambleTextEffect(el);
        });
        
        this.lenis = new Lenis({ lerp: 0.08, smooth: true });
        this.lenis.on('scroll', ScrollTrigger.update);
        
        this.probeDataY = document.getElementById('probe-y');

        this.initGSAP();
        
        // Ativa os 6 recursos Masterpiece
        this.masterpiece = new MasterpieceFeatures(this.lenis);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
            this.mesh.render();
            if(this.probeDataY) this.probeDataY.innerText = Math.floor(this.lenis.animatedScroll);
        });
        gsap.ticker.lagSmoothing(0);
    }

    initGSAP() {
        // Kinetic 3D Snap (Apple-like Domino Effect)
        gsap.set('#main-title .char', { y: 150, rotateX: -90, opacity: 0, transformOrigin: "50% 50% -50" });
        gsap.to('#main-title .char', { 
            y: 0, rotateX: 0, opacity: 1, 
            duration: 1.2, stagger: 0.04, ease: "power4.out", delay: 0.1 
        });
        
        // Reveals (Spring Physics)
        gsap.utils.toArray('.gsap-reveal').forEach(el => {
            gsap.to(el, { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)", scrollTrigger: { trigger: el, start: "top 85%" } });
        });

        // Contadores
        document.querySelectorAll('.counter-float').forEach(c => {
            gsap.to(c, { textContent: parseFloat(c.getAttribute('data-target')), duration: 2, ease: "power2.out", snap: { textContent: 0.01 }, scrollTrigger: { trigger: c, start: "top 85%" } });
        });
        document.querySelectorAll('.counter-int').forEach(c => {
            gsap.to(c, { textContent: parseInt(c.getAttribute('data-target')), duration: 2, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: c, start: "top 85%" }, onUpdate: function() { c.innerHTML = Math.ceil(this.targets()[0].textContent).toLocaleString(); } });
        });

        // SVG Chart Latency
        const path = document.getElementById('latency-path');
        const nodes = gsap.utils.toArray('.chart-node');
        if(path) {
            const l = path.getTotalLength();
            gsap.set(path, { strokeDasharray: l, strokeDashoffset: l });
            gsap.timeline({ scrollTrigger: { trigger: ".latency-chart", start: "top 80%" } })
                .to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
                .to(nodes, { opacity: 1, duration: 0.5, stagger: 0.2 }, "-=0.5");
        }

        // Fios de Energia interagindo com o Scroll
        gsap.to('.data-wire', {
            strokeDashoffset: -200, // Faz a energia fluir mais rápido no scroll
            ease: "none",
            scrollTrigger: {
                trigger: "#dashboard",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
            }
        });

        // Brilho dos Cards do Mouse
        document.querySelectorAll('.glass-card, .vault-card, .video-frame').forEach(c => {
            c.addEventListener('mousemove', e => {
                const r = c.getBoundingClientRect();
                c.style.setProperty('--mx', `${e.clientX - r.left}px`);
                c.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        });

        // HORIZONTAL SCROLL (ARSENAL)
        const track = document.getElementById('horizontal-track');
        if(track) {
            // A largura total que precisamos mover é o tamanho do track menos a tela visível
            let trackWidth = track.scrollWidth - window.innerWidth;
            gsap.to(track, {
                x: () => - (track.scrollWidth - window.innerWidth + 100), // +100px padding extra no final
                ease: "none",
                scrollTrigger: {
                    trigger: "#arsenal",
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${track.scrollWidth}`, // Duração do scroll baseada na largura
                    invalidateOnRefresh: true
                }
            });
        }

        // ARCHITECTURE INTERACTIVE SCROLL
        const archSection = document.getElementById('architecture');
        const wireMain = document.getElementById('wire-main');
        const wireBranch = document.getElementById('wire-branch');
        
        if(archSection && wireMain && wireBranch) {
            const l1 = wireMain.getTotalLength();
            const l2 = wireBranch.getTotalLength();
            
            // Set initial state
            gsap.set(wireMain, { strokeDasharray: l1, strokeDashoffset: l1 });
            gsap.set(wireBranch, { strokeDasharray: l2, strokeDashoffset: l2 });
            gsap.set('.arch-node circle, .arch-node rect', { fill: 'var(--sys-surface)', stroke: 'rgba(255,255,255,0.2)' });
            gsap.set('.arch-step', { opacity: 0.2, x: -20 });

            const archTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#architecture",
                    start: "top 40%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            // 1. Ingress
            archTl.to('#node-ingress circle:not(.node-pulse)', { stroke: 'var(--brand-cyan)', fill: 'rgba(0,240,255,0.1)', duration: 0.1 })
                  .to('#step-1', {opacity: 1, x: 0, duration: 0.5}, "<");
            
            // 2. Draw line to Kafka
            archTl.to(wireMain, { strokeDashoffset: l1 * 0.45, duration: 1 })
                  .to('#node-kafka rect', { stroke: 'var(--brand-purple)', fill: 'rgba(138,43,226,0.1)', duration: 0.1 })
                  .to('#step-2', {opacity: 1, x: 0, duration: 0.5}, "<");

            // 3. Draw lines to Workers
            archTl.to(wireMain, { strokeDashoffset: 0, duration: 1 })
                  .to(wireBranch, { strokeDashoffset: 0, duration: 1 }, "<")
                  .to('#node-worker1 circle, #node-worker2 circle', { stroke: 'var(--brand-cyan)', fill: 'rgba(0,240,255,0.1)', duration: 0.1 })
                  .to('#step-3', {opacity: 1, x: 0, duration: 0.5}, "<");
        }
    }
}

// 4. THE 6 MASTERPIECE FEATURES
class MasterpieceFeatures {
    constructor(lenis) {
        this.lenis = lenis;
        this.initTerminal();
        this.initMagneticUX();
        this.init3DTilt();
        this.initTimeline();
        this.initLiquidFooter();
        this.initProjectVault();
    }
    
    initProjectVault() {
        const theater = document.getElementById('project-theater');
        const titleEl = document.getElementById('theater-title');
        const descEl = document.getElementById('theater-desc');
        const githubBtn = document.getElementById('theater-github-btn');
        
        if(!theater) return;

        // Map each project data-id to its own GitHub repository URL
        const projectRepos = {
            raftkv:       'https://github.com/Leanza-dev/RaftKV',
            gigamq:       'https://github.com/Leanza-dev/GigaMQ',
            sagacommerce: 'https://github.com/Leanza-dev/SagaCommerce',
            gigacloud:    'https://github.com/Leanza-dev/GigaCloud',
            aurabalancer: 'https://github.com/Leanza-dev/AuraBalancer',
            skatetech:    'https://github.com/Leanza-dev/SkateTech',
            showroom:     'https://github.com/Leanza-dev/ShowroomVelocidade',
        };

        document.querySelectorAll('.project-showcase-card').forEach(card => {
            const playWraps = card.querySelectorAll('.explore-overlay-btn, .explore-desktop-btn');
            
            playWraps.forEach(playWrap => {
                playWrap.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Fetch dynamic localized content directly from DOM to ensure correct language switches
                    const titleH3 = card.querySelector('h3');
                    const descP = card.querySelector('p');
                    
                    const titleKey = titleH3 ? titleH3.getAttribute('data-i18n') : null;
                    const descKey = descP ? descP.getAttribute('data-i18n') : null;
                    
                    if (titleKey) titleEl.setAttribute('data-i18n', titleKey);
                    else titleEl.removeAttribute('data-i18n');
                    
                    if (descKey) descEl.setAttribute('data-i18n', descKey);
                    else descEl.removeAttribute('data-i18n');
                    
                    titleEl.innerHTML = titleH3 ? titleH3.innerHTML : '';
                    descEl.innerHTML = descP ? descP.innerHTML : '';

                    // Update the GitHub button to point to THIS project's repo
                    const projectId = card.getAttribute('data-project');
                    const repoUrl = projectRepos[projectId] || 'https://github.com/Leanza-dev';
                    if(githubBtn) {
                        githubBtn.onclick = () => window.open(repoUrl, '_blank');
                    }
                    
                    const injectStage = () => {
                        const stage = theater.querySelector('.theater-stage');
                        if(projectId && ProjectInjectors[projectId]) {
                            ProjectInjectors[projectId](stage);
                        } else {
                            stage.innerHTML = `
                                <div class="stage-placeholder">
                                    <div class="stage-pulse"></div>
                                    <span class="font-mono text-cyan" style="position:relative; z-index:2;">SYSTEM STANDBY... AWAITING DEPLOYMENT</span>
                                </div>
                            `;
                        }
                    };

                    const logo = document.querySelector('.hud-brand img');
                    
                    if(logo) {
                        const logoRect = logo.getBoundingClientRect();
                        const centerX = window.innerWidth / 2;
                        const centerY = window.innerHeight / 2;
                        
                        const tx = centerX - (logoRect.left + logoRect.width / 2);
                        const ty = centerY - (logoRect.top + logoRect.height / 2);
                        
                        const tl = gsap.timeline();
                        
                        // 1. Puxa a logo pro meio, girando e aumentando
                        tl.to(logo, { x: tx, y: ty, scale: 6, rotation: 180, duration: 0.6, ease: "power4.inOut" })
                        // 2. Logo desaparece (implosão)
                          .to(logo, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
                        // 3. Abre o ambiente do centro e injeta o projeto
                          .add(() => { 
                              theater.classList.add('active'); 
                              injectStage();
                          }, "-=0.1")
                          .fromTo(theater, 
                              { clipPath: `circle(0% at 50% 50%)` },
                              { clipPath: `circle(150% at 50% 50%)`, duration: 0.8, ease: "power3.inOut" },
                              "-=0.2"
                          );
                    } else {
                        // Fallback caso não tenha logo
                        theater.classList.add('active');
                        injectStage();
                        gsap.fromTo(theater, { clipPath: `circle(0% at 50% 50%)` }, { clipPath: `circle(150% at 50% 50%)`, duration: 0.8, ease: "power3.inOut" });
                    }
                });
            });
        });
    }

    closeTheater() {
        const theater = document.getElementById('project-theater');
        const logo = document.querySelector('.hud-brand img');
        
        if(theater) {
            gsap.killTweensOf('.log-line'); // Para animações residuais
            const tl = gsap.timeline();
            
            // 1. Fecha o ambiente (implosão da tela negra)
            tl.to(theater, {
                clipPath: `circle(0% at 50% 50%)`, duration: 0.6, ease: "power3.inOut",
                onComplete: () => theater.classList.remove('active')
            });
            
            // 2. Devolve a logo
            if(logo) {
                // A logo reaparece no centro
                tl.to(logo, { scale: 6, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.4")
                  // Volta para o canto
                  .to(logo, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.6, ease: "power3.inOut" });
            }
        }
    }



    initTerminal() {
        const term = document.getElementById('tactical-terminal');
        const header = term.querySelector('.term-header');
        const input = document.getElementById('term-input');
        const body = document.getElementById('term-body');

        // Make draggable
        let isDragging = false, startX, startY, initialX, initialY;
        header.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.clientX; startY = e.clientY;
            initialX = term.offsetLeft; initialY = term.offsetTop;
        });
        window.addEventListener('mousemove', e => {
            if(!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            term.style.left = `${initialX + dx}px`;
            term.style.top = `${initialY + dy}px`;
            term.style.right = 'auto'; // Reset right anchor
        });
        window.addEventListener('mouseup', () => isDragging = false);

        // Command Engine
        input.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                const cmd = input.value.trim().toLowerCase();
                input.value = '';
                
                let response = '';
                if(cmd === 'whoami') response = 'Pedro Leanza - Especialista em Arquiteturas Escaláveis.';
                else if(cmd === 'contact') response = 'E-mail: leanzapedro@gmail.com | IG: @__leanza__ | Tel: 11933283001';
                else if(cmd === 'skills') response = 'Go, Rust, Node.js, React, Kafka, Redis, PostgreSQL, Kubernetes.';
                else if(cmd === 'clear') { 
                    const lines = body.querySelectorAll('.term-line');
                    lines.forEach(l => l.remove());
                    return; 
                }
                else if(cmd === 'help') response = 'Comandos: whoami, contact, skills, clear.';
                else if(cmd !== '') response = `Command not found: ${cmd}`;

                if(cmd !== '') {
                    const lineCmd = document.createElement('div');
                    lineCmd.className = 'term-line text-white';
                    lineCmd.innerHTML = `<span class="text-cyan">$</span> ${cmd}`;
                    body.insertBefore(lineCmd, input.parentElement);

                    if(response) {
                        const lineRes = document.createElement('div');
                        lineRes.className = 'term-line';
                        lineRes.innerText = response;
                        body.insertBefore(lineRes, input.parentElement);
                    }
                    body.scrollTop = body.scrollHeight;
                }
            }
        });
    }

    initMagneticUX() {
        document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
            const btn = wrap.querySelector('.magnetic-btn') || wrap.firstElementChild;
            
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const hx = (e.clientX - rect.left) - rect.width / 2;
                const hy = (e.clientY - rect.top) - rect.height / 2;
                
                // Puxa o botão com força magnética
                gsap.to(btn, { x: hx * 0.4, y: hy * 0.4, duration: 0.5, ease: "power3.out" });
            });
            wrap.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

    init3DTilt() {
        document.querySelectorAll('.tilt-wrapper').forEach(wrapper => {
            const el = wrapper.querySelector('.tilt-element');
            const glare = wrapper.querySelector('.glare');
            
            wrapper.addEventListener('mousemove', e => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                
                const tiltX = ((y - cy) / cy) * -10; // Max 10 deg
                const tiltY = ((x - cx) / cx) * 10;
                
                gsap.to(el, { rotateX: tiltX, rotateY: tiltY, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
                
                if(glare) {
                    gsap.to(glare, { x: x - cx * 2, y: y - cy * 2, opacity: 1, duration: 0.2 });
                }
            });
            wrapper.addEventListener('mouseleave', () => {
                gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
                if(glare) gsap.to(glare, { opacity: 0, duration: 0.5 });
            });
        });
    }

    initTimeline() {
        const laser = document.getElementById('timeline-laser');
        const items = gsap.utils.toArray('.timeline-item');
        
        if(!laser || items.length === 0) return;

        // Anima o laser principal descendo
        gsap.to(laser, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 60%",
                end: "bottom 60%",
                scrub: 1
            }
        });

        // Acende os itens assim que o laser passa por eles
        items.forEach(item => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 60%",
                onEnter: () => item.classList.add('active'),
                onLeaveBack: () => item.classList.remove('active')
            });
        });
    }

    initLiquidFooter() {
        const btn = document.getElementById('copy-email-btn');
        const text = document.getElementById('massive-text');
        
        if(!btn || !text) return;

        btn.addEventListener('click', (e) => {
            navigator.clipboard.writeText('leanzapedro@gmail.com');
            text.innerHTML = "EMAIL<br>COPIED!";
            text.style.color = 'var(--brand-cyan)';
            
            // Generate particles
            for(let i=0; i<25; i++) {
                const p = document.createElement('div');
                p.className = 'contact-particle';
                p.style.width = Math.random() * 8 + 4 + 'px';
                p.style.height = p.style.width;
                p.style.left = e.clientX + 'px';
                p.style.top = e.clientY + 'px';
                
                const tx = (Math.random() - 0.5) * 300;
                const ty = (Math.random() - 0.5) * 300;
                p.style.setProperty('--tx', `${tx}px`);
                p.style.setProperty('--ty', `${ty}px`);
                
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 800);
            }
            
            setTimeout(() => {
                text.innerHTML = "LET'S BUILD<br>SOMETHING.";
                text.style.color = 'var(--text-white)';
            }, 3000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.App = new EliteOrchestrator();
    // Initialize i18n after app boots (restores language from localStorage)
    if (window.I18n) window.I18n.init();
});