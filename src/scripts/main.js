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
            if (val && typeof val === 'string') {
                this.originalText = val.replace(/\n/g, '<br>');
            } else {
                this.originalText = this.i18nKey;
            }
            // Extrair texto limpo sem tags HTML (como <br>) para embaralhar
            const temp = document.createElement('div');
            temp.innerHTML = this.originalText;
            this.cleanText = temp.innerText;
        } else {
            this.originalText = this.element.innerHTML || '';
            this.cleanText = this.element.innerText || '';
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
    raftkv: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">RAFT CONSENSUS TOPOLOGY</h3>
                <div style="position:relative; width:400px; height:300px;">
                    <!-- SVG Wires -->
                    <svg width="400" height="300" style="position:absolute; top:0; left:0; pointer-events:none;">
                        <path id="raft-wire-1" d="M 200 50 L 100 200" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
                        <path id="raft-wire-2" d="M 200 50 L 300 200" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
                        <path id="raft-wire-3" d="M 100 200 L 300 200" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none" stroke-dasharray="5 5"/>
                        
                        <!-- Pulse Particles -->
                        <circle id="raft-pulse-1" r="4" fill="var(--brand-cyan)" opacity="0"/>
                        <circle id="raft-pulse-2" r="4" fill="var(--brand-cyan)" opacity="0"/>
                    </svg>
                    
                    <!-- Nodes -->
                    <div id="raft-node-leader" style="position:absolute; top:20px; left:160px; width:80px; height:80px; border-radius:50%; border:2px solid var(--brand-cyan); display:flex; align-items:center; justify-content:center; background:rgba(0,240,255,0.1); box-shadow:0 0 20px rgba(0,240,255,0.2);">
                        <span class="font-mono text-white text-xs">LEADER</span>
                    </div>
                    <div id="raft-node-f1" style="position:absolute; top:170px; left:60px; width:80px; height:80px; border-radius:50%; border:2px solid rgba(255,255,255,0.3); display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05);">
                        <span class="font-mono text-silver text-xs">FOLLOWER</span>
                    </div>
                    <div id="raft-node-f2" style="position:absolute; top:170px; left:260px; width:80px; height:80px; border-radius:50%; border:2px solid rgba(255,255,255,0.3); display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05);">
                        <span class="font-mono text-silver text-xs">FOLLOWER</span>
                    </div>
                </div>
            </div>
        `;

        if (xrayElement) {
            // Heartbeat animation loop
            const runHeartbeats = () => {
                if(!document.getElementById('raft-node-leader')) return;
                
                const tl = gsap.timeline();
                // Pulse leader
                tl.to('#raft-node-leader', { scale: 1.1, boxShadow: '0 0 40px rgba(0,240,255,0.6)', duration: 0.2 })
                  .to('#raft-node-leader', { scale: 1, boxShadow: '0 0 20px rgba(0,240,255,0.2)', duration: 0.4 });
                  
                // Send heartbeat particles along wires using motionPath plugin (or just simple translation since we know coordinates)
                // We'll use simple translation for reliability without external plugins
                gsap.fromTo('#raft-pulse-1', { x: 200, y: 50, opacity: 1 }, { x: 100, y: 200, opacity: 0, duration: 0.6, ease: "power1.in" }, "-=0.4");
                gsap.fromTo('#raft-pulse-2', { x: 200, y: 50, opacity: 1 }, { x: 300, y: 200, opacity: 0, duration: 0.6, ease: "power1.in" }, "-=0.6");
                
                // Followers blink green upon receiving
                tl.to(['#raft-node-f1', '#raft-node-f2'], { borderColor: '#00ce7c', backgroundColor: 'rgba(0,206,124,0.1)', duration: 0.2 }, "-=0.1")
                  .to(['#raft-node-f1', '#raft-node-f2'], { borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.4 });
                  
                setTimeout(runHeartbeats, 2000);
            };
            setTimeout(runHeartbeats, 1000);
        }
    },
    gigamq: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">GIGAMQ EVENT BUS TOPOLOGY</h3>
                <div style="position:relative; width:500px; height:250px; display:flex; align-items:center; justify-content:space-between;">
                    
                    <!-- Producers -->
                    <div style="display:flex; flex-direction:column; gap:20px; z-index:2;">
                        <div class="mq-producer" style="width:60px; height:60px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.3); border-radius:8px; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">P1</span></div>
                        <div class="mq-producer" style="width:60px; height:60px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.3); border-radius:8px; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">P2</span></div>
                    </div>

                    <!-- Broker -->
                    <div style="position:relative; width:150px; height:200px; border:2px solid var(--brand-purple); border-radius:12px; background:rgba(138,43,226,0.1); display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 0 30px rgba(138,43,226,0.2); z-index:2;">
                        <span class="font-black text-silver" style="font-size:0.8rem; letter-spacing:2px; margin-bottom:15px;">BROKER</span>
                        <div style="width:80%; height:100px; display:flex; flex-direction:column; gap:5px; padding:10px; border:1px solid rgba(138,43,226,0.5); background:rgba(0,0,0,0.5); border-radius:4px; overflow:hidden;" id="mq-queue-stack">
                            <!-- Stack items -->
                        </div>
                    </div>

                    <!-- Consumers -->
                    <div style="display:flex; flex-direction:column; gap:20px; z-index:2;">
                        <div class="mq-consumer" style="width:60px; height:60px; background:rgba(255,255,255,0.05); border:1px dashed var(--brand-cyan); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">C1</span></div>
                        <div class="mq-consumer" style="width:60px; height:60px; background:rgba(255,255,255,0.05); border:1px dashed var(--brand-cyan); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">C2</span></div>
                        <div class="mq-consumer" style="width:60px; height:60px; background:rgba(255,255,255,0.05); border:1px dashed var(--brand-cyan); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">C3</span></div>
                    </div>

                    <!-- Flow Container -->
                    <div id="mq-flow-layer" style="position:absolute; inset:0; pointer-events:none; z-index:1;"></div>
                </div>
            </div>
        `;

        if(xrayElement) {
            const flowLayer = xrayElement.querySelector('#mq-flow-layer');
            const stack = xrayElement.querySelector('#mq-queue-stack');
            
            const fireMessage = () => {
                if(!flowLayer) return;
                const isP1 = Math.random() > 0.5;
                const startY = isP1 ? 30 : 110;
                
                // Produzir msg
                const msg = document.createElement('div');
                msg.style.position = 'absolute';
                msg.style.width = '10px';
                msg.style.height = '4px';
                msg.style.background = '#fff';
                msg.style.boxShadow = '0 0 10px #fff';
                msg.style.left = '60px';
                msg.style.top = startY + 'px';
                flowLayer.appendChild(msg);

                // Vai pro broker
                gsap.to(msg, {
                    x: 100, y: 125 - startY, duration: 0.3, ease: "power2.in",
                    onComplete: () => {
                        msg.remove();
                        // Adiciona na stack
                        const stackItem = document.createElement('div');
                        stackItem.style.width = '100%';
                        stackItem.style.height = '8px';
                        stackItem.style.background = 'var(--brand-purple)';
                        stackItem.style.marginBottom = '2px';
                        stack.prepend(stackItem);
                        
                        if(stack.children.length > 8) stack.lastChild.remove();

                        // Consumidor puxa
                        setTimeout(() => {
                            if(!flowLayer) return;
                            const consumerIdx = Math.floor(Math.random() * 3);
                            const endYs = [30, 110, 190];
                            const cMsg = document.createElement('div');
                            cMsg.style.position = 'absolute';
                            cMsg.style.width = '6px';
                            cMsg.style.height = '6px';
                            cMsg.style.borderRadius = '50%';
                            cMsg.style.background = 'var(--brand-cyan)';
                            cMsg.style.boxShadow = '0 0 10px var(--brand-cyan)';
                            cMsg.style.left = '335px';
                            cMsg.style.top = '125px';
                            flowLayer.appendChild(cMsg);
                            
                            if(stack.firstChild) stack.firstChild.remove();

                            gsap.to(cMsg, {
                                x: 100, y: endYs[consumerIdx] - 125, duration: 0.4, ease: "power2.out",
                                onComplete: () => cMsg.remove()
                            });
                        }, Math.random() * 200 + 100);
                    }
                });
                
                setTimeout(fireMessage, Math.random() * 400 + 100);
            };
            
            setTimeout(fireMessage, 500);
        }
    },
    sagacommerce: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">DISTRIBUTED SAGA PATTERN</h3>
                <div style="position:relative; width:450px; height:300px;">
                    <!-- Coordinator -->
                    <div id="saga-coord" style="position:absolute; top:20px; left:175px; width:100px; height:60px; background:rgba(0,240,255,0.1); border:2px solid var(--brand-cyan); border-radius:8px; display:flex; align-items:center; justify-content:center; z-index:2;">
                        <span class="font-mono text-white text-xs">COORDINATOR</span>
                    </div>

                    <!-- Services -->
                    <div id="saga-srv-1" style="position:absolute; top:200px; left:20px; width:90px; height:90px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-direction:column; z-index:2;">
                        <span class="font-mono text-silver text-xs">ORDER</span>
                        <div class="saga-status" style="width:10px; height:10px; border-radius:50%; background:#333; margin-top:10px;"></div>
                    </div>
                    <div id="saga-srv-2" style="position:absolute; top:200px; left:180px; width:90px; height:90px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-direction:column; z-index:2;">
                        <span class="font-mono text-silver text-xs">PAYMENT</span>
                        <div class="saga-status" style="width:10px; height:10px; border-radius:50%; background:#333; margin-top:10px;"></div>
                    </div>
                    <div id="saga-srv-3" style="position:absolute; top:200px; left:340px; width:90px; height:90px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-direction:column; z-index:2;">
                        <span class="font-mono text-silver text-xs">INVENTORY</span>
                        <div class="saga-status" style="width:10px; height:10px; border-radius:50%; background:#333; margin-top:10px;"></div>
                    </div>

                    <!-- Event Bus (Kafka) -->
                    <div style="position:absolute; top:120px; left:50px; width:350px; height:30px; background:rgba(138,43,226,0.1); border-top:2px dashed var(--brand-purple); border-bottom:2px dashed var(--brand-purple); display:flex; align-items:center; justify-content:center; z-index:1;">
                        <span class="font-mono text-purple text-xs" style="color:var(--brand-purple); opacity:0.6; letter-spacing:4px;">EVENT BUS</span>
                    </div>

                    <!-- Particles -->
                    <div id="saga-flow-layer" style="position:absolute; inset:0; pointer-events:none; z-index:3;"></div>
                </div>
            </div>
        `;

        if(xrayElement) {
            const flowLayer = xrayElement.querySelector('#saga-flow-layer');
            const runSagaXray = async () => {
                if(!flowLayer) return;

                const createParticle = (startX, startY, color) => {
                    const p = document.createElement('div');
                    p.style.position = 'absolute';
                    p.style.width = '8px';
                    p.style.height = '8px';
                    p.style.borderRadius = '50%';
                    p.style.background = color;
                    p.style.boxShadow = `0 0 10px ${color}`;
                    p.style.left = startX + 'px';
                    p.style.top = startY + 'px';
                    flowLayer.appendChild(p);
                    return p;
                };

                const setStatus = (id, color) => {
                    const el = xrayElement.querySelector(`#${id} .saga-status`);
                    if(el) el.style.background = color;
                };

                // Coord -> Order
                const p1 = createParticle(225, 80, 'var(--brand-cyan)');
                gsap.to(p1, { x: -160, y: 120, duration: 0.5, ease: "power2.inOut", onComplete: () => {
                    p1.remove();
                    setStatus('saga-srv-1', '#00ce7c'); // Success
                    
                    // Order -> Event Bus -> Payment
                    setTimeout(() => {
                        if(!flowLayer) return;
                        const p2 = createParticle(65, 200, 'var(--brand-purple)');
                        gsap.to(p2, { x: 160, y: -65, duration: 0.5, ease: "power2.inOut", onComplete: () => {
                            p2.remove();
                            setStatus('saga-srv-2', '#00ce7c');

                            // Payment -> Event Bus -> Inventory
                            setTimeout(() => {
                                if(!flowLayer) return;
                                const p3 = createParticle(225, 200, 'var(--brand-purple)');
                                gsap.to(p3, { x: 160, y: -65, duration: 0.5, ease: "power2.inOut", onComplete: () => {
                                    p3.remove();
                                    
                                    // 50% chance of failure
                                    if(Math.random() > 0.5) {
                                        setStatus('saga-srv-3', '#e06c75'); // Fail
                                        // Rollback
                                        setTimeout(() => {
                                            if(!flowLayer) return;
                                            const pr = createParticle(385, 200, '#e06c75');
                                            gsap.to(pr, { x: -160, y: -65, duration: 0.5, ease: "power2.inOut", onComplete: () => {
                                                pr.remove();
                                                setStatus('saga-srv-2', '#e06c75');
                                                setTimeout(() => {
                                                    setStatus('saga-srv-1', '#333');
                                                    setStatus('saga-srv-2', '#333');
                                                    setStatus('saga-srv-3', '#333');
                                                    setTimeout(runSagaXray, 1000);
                                                }, 1000);
                                            }});
                                        }, 500);
                                    } else {
                                        setStatus('saga-srv-3', '#00ce7c'); // Success
                                        setTimeout(() => {
                                            setStatus('saga-srv-1', '#333');
                                            setStatus('saga-srv-2', '#333');
                                            setStatus('saga-srv-3', '#333');
                                            setTimeout(runSagaXray, 1000);
                                        }, 1000);
                                    }
                                }});
                            }, 400);
                        }});
                    }, 400);
                }});
            };
            
            setTimeout(runSagaXray, 1000);
        }
    },
    gigacloud: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">SERVERLESS ELASTIC TOPOLOGY</h3>
                <div style="position:relative; width:500px; height:250px;">
                    <!-- API Gateway -->
                    <div style="position:absolute; top:100px; left:20px; width:80px; height:50px; background:rgba(0,240,255,0.05); border:1px solid var(--brand-cyan); border-radius:4px; display:flex; align-items:center; justify-content:center; z-index:2; box-shadow:0 0 15px rgba(0,240,255,0.2);">
                        <span class="font-mono text-white text-xs">GATEWAY</span>
                    </div>

                    <!-- Scaling Group -->
                    <div style="position:absolute; top:20px; left:180px; width:280px; height:210px; border:2px dashed rgba(255,255,255,0.2); border-radius:8px; padding:15px; display:flex; flex-wrap:wrap; gap:10px; align-content:flex-start; overflow:hidden;" id="cloud-xray-group">
                        <span style="position:absolute; top:-10px; left:10px; background:var(--sys-black); padding:0 5px; font-size:0.6rem; color:var(--text-silver); font-family:var(--font-mono);">AUTO-SCALING COMPUTE POOL</span>
                    </div>

                    <!-- Flow container -->
                    <div id="cloud-xray-flow" style="position:absolute; inset:0; pointer-events:none; z-index:1;"></div>
                </div>
            </div>
        `;

        if(xrayElement) {
            const flow = xrayElement.querySelector('#cloud-xray-flow');
            const group = xrayElement.querySelector('#cloud-xray-group');
            let nodes = [];

            const spawnNode = () => {
                const node = document.createElement('div');
                node.style.width = '30px';
                node.style.height = '30px';
                node.style.background = 'rgba(0,240,255,0.1)';
                node.style.border = '1px solid var(--brand-cyan)';
                node.style.borderRadius = '4px';
                node.style.boxShadow = '0 0 10px rgba(0,240,255,0.3)';
                group.appendChild(node);
                nodes.push(node);
                gsap.from(node, { scale: 0, rotation: 90, duration: 0.4, ease: "back.out(1.5)" });
            };

            const killNode = () => {
                if(nodes.length === 0) return;
                const node = nodes.pop();
                gsap.to(node, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => node.remove() });
            };

            // Init 3 nodes
            for(let i=0; i<3; i++) spawnNode();

            const runCloudTraffic = () => {
                if(!flow) return;

                // Gateway pulse
                const req = document.createElement('div');
                req.style.position = 'absolute';
                req.style.width = '15px';
                req.style.height = '2px';
                req.style.background = '#fff';
                req.style.left = '100px';
                req.style.top = '124px';
                flow.appendChild(req);

                // Auto scaling logic: more traffic = more nodes
                if(Math.random() > 0.7 && nodes.length < 24) spawnNode();
                if(Math.random() > 0.85 && nodes.length > 3) killNode();

                // Pick a random target node if available
                if(nodes.length > 0) {
                    const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
                    const targetRect = targetNode.getBoundingClientRect();
                    const flowRect = flow.getBoundingClientRect();
                    
                    const tx = targetRect.left - flowRect.left;
                    const ty = targetRect.top - flowRect.top + 15;

                    gsap.to(req, {
                        x: tx - 100, y: ty - 124, duration: 0.3, ease: "power1.in",
                        onComplete: () => {
                            req.remove();
                            // Flash node
                            gsap.to(targetNode, { background: 'rgba(0,240,255,0.5)', duration: 0.1, yoyo: true, repeat: 1 });
                        }
                    });
                } else {
                    gsap.to(req, { x: 100, opacity: 0, duration: 0.3, onComplete: () => req.remove() });
                }

                setTimeout(runCloudTraffic, Math.random() * 150 + 50);
            };

            setTimeout(runCloudTraffic, 1000);
        }
    },
    aurabalancer: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">L7 EDGE PROXY & LOAD BALANCER</h3>
                <div style="position:relative; width:600px; height:300px; display:flex; align-items:center; justify-content:space-between;">
                    
                    <!-- Clients -->
                    <div style="display:flex; flex-direction:column; gap:10px; z-index:2;">
                        <div class="lb-client" style="width:40px; height:40px; background:rgba(255,255,255,0.05); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">US</span></div>
                        <div class="lb-client" style="width:40px; height:40px; background:rgba(255,255,255,0.05); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">EU</span></div>
                        <div class="lb-client" style="width:40px; height:40px; background:rgba(255,255,255,0.05); border-radius:50%; display:flex; align-items:center; justify-content:center;"><span class="font-mono text-xs">AS</span></div>
                    </div>

                    <!-- Edge Proxy (Aura) -->
                    <div id="lb-proxy" style="position:relative; width:120px; height:240px; background:rgba(0,206,124,0.05); border:2px solid #00ce7c; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-direction:column; box-shadow:0 0 20px rgba(0,206,124,0.2); z-index:2;">
                        <span class="font-black text-white" style="font-size:1rem; letter-spacing:2px; color:#00ce7c;">AURA</span>
                        <span class="font-mono text-silver text-xs mt-2">NGINX / ENVOY</span>
                        <div id="lb-indicator" style="width:8px; height:8px; border-radius:50%; background:#00ce7c; margin-top:20px;"></div>
                    </div>

                    <!-- Upstream Clusters -->
                    <div style="display:flex; flex-direction:column; gap:20px; z-index:2;">
                        <div id="lb-up-1" style="width:140px; height:60px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:4px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                            <span class="font-mono text-xs">CLUSTER A</span>
                            <div class="lb-health" style="width:6px; height:6px; background:#00ce7c; border-radius:50%; margin-top:5px;"></div>
                        </div>
                        <div id="lb-up-2" style="width:140px; height:60px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:4px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                            <span class="font-mono text-xs">CLUSTER B</span>
                            <div class="lb-health" style="width:6px; height:6px; background:#00ce7c; border-radius:50%; margin-top:5px;"></div>
                        </div>
                        <div id="lb-up-3" style="width:140px; height:60px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); border-radius:4px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                            <span class="font-mono text-xs">CLUSTER C</span>
                            <div class="lb-health" style="width:6px; height:6px; background:#00ce7c; border-radius:50%; margin-top:5px;"></div>
                        </div>
                    </div>

                    <!-- Flow container -->
                    <div id="lb-flow-layer" style="position:absolute; inset:0; pointer-events:none; z-index:1;"></div>
                </div>
            </div>
        `;

        if(xrayElement) {
            const flow = xrayElement.querySelector('#lb-flow-layer');
            const proxy = xrayElement.querySelector('#lb-proxy');
            
            const runL7Traffic = () => {
                if(!flow) return;

                const clientIdx = Math.floor(Math.random() * 3);
                const startYs = [40, 150, 260];
                
                // Client -> Proxy
                const req = document.createElement('div');
                req.style.position = 'absolute';
                req.style.width = '12px';
                req.style.height = '4px';
                req.style.background = 'var(--text-white)';
                req.style.left = '40px';
                req.style.top = startYs[clientIdx] + 'px';
                flow.appendChild(req);

                gsap.to(req, {
                    x: 200, y: 150 - startYs[clientIdx], duration: 0.4, ease: "power1.in",
                    onComplete: () => {
                        req.remove();
                        // Proxy logic blink
                        gsap.to(proxy, { boxShadow: '0 0 40px rgba(0,206,124,0.5)', duration: 0.1, yoyo: true, repeat: 1 });

                        // Proxy -> Upstream (Round robin simulation)
                        const upIdx = Math.floor(Math.random() * 3);
                        const endYs = [50, 150, 250];

                        const proxyReq = document.createElement('div');
                        proxyReq.style.position = 'absolute';
                        proxyReq.style.width = '8px';
                        proxyReq.style.height = '8px';
                        proxyReq.style.borderRadius = '50%';
                        proxyReq.style.background = '#00ce7c';
                        proxyReq.style.boxShadow = '0 0 10px #00ce7c';
                        proxyReq.style.left = '360px';
                        proxyReq.style.top = '150px';
                        flow.appendChild(proxyReq);

                        gsap.to(proxyReq, {
                            x: 100, y: endYs[upIdx] - 150, duration: 0.3, ease: "power2.out",
                            onComplete: () => {
                                proxyReq.remove();
                                const targetUp = xrayElement.querySelector(`#lb-up-${upIdx+1}`);
                                gsap.to(targetUp, { borderColor: '#00ce7c', duration: 0.1, yoyo: true, repeat: 1 });
                            }
                        });
                    }
                });

                setTimeout(runL7Traffic, Math.random() * 300 + 100);
            };

            setTimeout(runL7Traffic, 500);
        }
    },
    skatetech: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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

        // --- X-RAY ARQUITETURA ---
        xrayElement.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;">
                <h3 class="font-mono text-cyan" style="letter-spacing:2px; font-size:1.2rem;">REACT NATIVE ARCHITECTURE</h3>
                <div style="position:relative; width:600px; height:300px; display:flex; align-items:center; justify-content:space-between;">
                    
                    <!-- JS Thread -->
                    <div style="position:relative; width:160px; height:200px; background:rgba(255,255,255,0.05); border:2px solid rgba(255,255,255,0.2); border-radius:8px; display:flex; flex-direction:column; align-items:center; padding-top:10px; z-index:2;">
                        <span class="font-black text-silver text-xs" style="letter-spacing:1px; margin-bottom:20px;">JS THREAD</span>
                        <div id="rn-js-logic" style="width:80%; height:40px; border:1px dashed var(--brand-cyan); border-radius:4px; display:flex; align-items:center; justify-content:center; margin-bottom:10px; background:rgba(0,240,255,0.05);">
                            <span class="font-mono text-xs">REACT LOGIC</span>
                        </div>
                        <div id="rn-js-state" style="width:80%; height:40px; border:1px dashed var(--brand-cyan); border-radius:4px; display:flex; align-items:center; justify-content:center; background:rgba(0,240,255,0.05);">
                            <span class="font-mono text-xs">STATE (ZUSTAND)</span>
                        </div>
                    </div>

                    <!-- Bridge -->
                    <div style="position:relative; width:120px; height:80px; display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:2;">
                        <span class="font-mono text-cyan text-xs" style="letter-spacing:2px; margin-bottom:5px;">THE BRIDGE</span>
                        <div style="width:100%; height:20px; border-top:2px solid var(--brand-cyan); border-bottom:2px solid var(--brand-cyan); display:flex; align-items:center; justify-content:center; background:rgba(0,240,255,0.1);">
                            <!-- bridge pulses -->
                        </div>
                    </div>

                    <!-- Native Thread -->
                    <div style="position:relative; width:160px; height:200px; background:rgba(255,255,255,0.05); border:2px solid rgba(255,255,255,0.2); border-radius:8px; display:flex; flex-direction:column; align-items:center; padding-top:10px; z-index:2;">
                        <span class="font-black text-silver text-xs" style="letter-spacing:1px; margin-bottom:20px;">NATIVE THREAD</span>
                        <div id="rn-ui-manager" style="width:80%; height:40px; border:1px solid #00ce7c; border-radius:4px; display:flex; align-items:center; justify-content:center; margin-bottom:10px; background:rgba(0,206,124,0.05);">
                            <span class="font-mono text-xs">UI MANAGER</span>
                        </div>
                        <div id="rn-native-views" style="width:80%; height:40px; border:1px solid #00ce7c; border-radius:4px; display:flex; align-items:center; justify-content:center; background:rgba(0,206,124,0.05);">
                            <span class="font-mono text-xs">NATIVE VIEWS</span>
                        </div>
                    </div>

                    <!-- Flow container -->
                    <div id="rn-flow-layer" style="position:absolute; inset:0; pointer-events:none; z-index:1;"></div>
                </div>
            </div>
        `;

        if(xrayElement) {
            const flow = xrayElement.querySelector('#rn-flow-layer');
            const jsLogic = xrayElement.querySelector('#rn-js-logic');
            const uiManager = xrayElement.querySelector('#rn-ui-manager');
            const nativeViews = xrayElement.querySelector('#rn-native-views');
            
            const runBridgeTraffic = () => {
                if(!flow) return;

                // JS Pulse
                gsap.to(jsLogic, { backgroundColor: 'rgba(0,240,255,0.2)', duration: 0.2, yoyo: true, repeat: 1 });

                // JSON msg across bridge
                const msg = document.createElement('div');
                msg.style.position = 'absolute';
                msg.style.width = '20px';
                msg.style.height = '10px';
                msg.style.background = 'var(--brand-cyan)';
                msg.style.boxShadow = '0 0 10px var(--brand-cyan)';
                msg.style.left = '160px';
                msg.style.top = '145px'; // Middle of bridge approx
                msg.innerText = '{}';
                msg.style.fontSize = '8px';
                msg.style.color = '#000';
                msg.style.display = 'flex';
                msg.style.alignItems = 'center';
                msg.style.justifyContent = 'center';
                msg.style.fontFamily = 'var(--font-mono)';
                flow.appendChild(msg);

                gsap.to(msg, {
                    x: 100, duration: 0.4, ease: "none",
                    onComplete: () => {
                        msg.remove();
                        // Native pulse
                        gsap.to(uiManager, { backgroundColor: 'rgba(0,206,124,0.2)', duration: 0.2, yoyo: true, repeat: 1 });
                        
                        // Render UI
                        setTimeout(() => {
                            if(!flow) return;
                            gsap.to(nativeViews, { borderColor: '#00ce7c', boxShadow: '0 0 20px rgba(0,206,124,0.4)', duration: 0.2, yoyo: true, repeat: 1 });
                        }, 200);
                    }
                });

                setTimeout(runBridgeTraffic, Math.random() * 800 + 400);
            };

            setTimeout(runBridgeTraffic, 1000);
        }
    },
    showroom: (previewElement, xrayElement) => {
        previewElement.innerHTML = `
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
        
        // Cursor muito responsivo com delay quase nulo (apenas para não quebrar a engine do GSAP)
        this.xToDot = gsap.quickTo(this.dot, "x", { duration: 0.02, ease: "none" });
        this.yToDot = gsap.quickTo(this.dot, "y", { duration: 0.02, ease: "none" });
        this.xToRing = gsap.quickTo(this.ring, "x", { duration: 0.02, ease: "none" });
        this.yToRing = gsap.quickTo(this.ring, "y", { duration: 0.02, ease: "none" });

        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.xToDot(this.mouseX); this.yToDot(this.mouseY);
            this.xToRing(this.mouseX); this.yToRing(this.mouseY);
        });

        // Checagem a 60fps do elemento sob o cursor para evitar o "freeze" durante o scroll
        gsap.ticker.add(() => {
            try {
                const el = document.elementFromPoint(this.mouseX, this.mouseY);
                if (el && el.closest) {
                    if (el.closest('.interactive-target') || el.closest('a') || el.closest('button')) {
                        document.body.classList.add('hover-engaged');
                    } else {
                        document.body.classList.remove('hover-engaged');
                    }
                } else {
                    document.body.classList.remove('hover-engaged');
                }
            } catch (err) {
                // Ignore silent errors from out-of-bounds element lookups
            }
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

            // Desvio elegante do cursor do mouse
            if (this.mouse.active) {
                let dx = p.x - this.mouse.x;
                let dy = p.y - this.mouse.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    let force = (120 - dist) / 120;
                    p.x += (dx / dist) * force * 3;
                    p.y += (dy / dist) * force * 3;
                }
            }

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
        
        // Transição "A Compilação" Back -> Front
        this.compilationTransition = new CompilationTransition();

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
                    scrub: window.innerWidth < 768 ? true : 1, // Native smooth scrub on mobile
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
                            stage.innerHTML = `
                                <div class="theater-header-controls interactive-target" style="position:absolute; top:20px; left:50%; transform:translateX(-50%); z-index:10; display:flex; gap:15px; pointer-events:all;">
                                    <button class="theater-toggle-btn active interactive-target" id="btn-preview">VER PREVIEW</button>
                                    <button class="theater-toggle-btn interactive-target" id="btn-xray">MODO RAIO-X</button>
                                </div>
                                <div class="theater-views-container" style="position:relative; width:100%; height:100%; padding-top:60px;">
                                    <div id="view-preview" style="position:absolute; inset:0; top:60px; z-index:2; transition: opacity 0.4s;"></div>
                                    <div id="view-xray" style="position:absolute; inset:0; top:60px; z-index:1; opacity:0; pointer-events:none; transition: opacity 0.4s; display:flex; align-items:center; justify-content:center; flex-direction:column;"></div>
                                </div>
                            `;

                            const viewPreview = stage.querySelector('#view-preview');
                            const viewXray = stage.querySelector('#view-xray');
                            
                            ProjectInjectors[projectId](viewPreview, viewXray);

                            const btnPreview = stage.querySelector('#btn-preview');
                            const btnXray = stage.querySelector('#btn-xray');

                            btnPreview.onclick = () => {
                                btnPreview.classList.add('active');
                                btnXray.classList.remove('active');
                                viewXray.style.opacity = '0';
                                viewXray.style.pointerEvents = 'none';
                                viewPreview.style.opacity = '1';
                                viewPreview.style.pointerEvents = 'all';
                            };

                            btnXray.onclick = () => {
                                btnXray.classList.add('active');
                                btnPreview.classList.remove('active');
                                viewPreview.style.opacity = '0';
                                viewPreview.style.pointerEvents = 'none';
                                viewXray.style.opacity = '1';
                                viewXray.style.pointerEvents = 'all';
                            };
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
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    window.App = new EliteOrchestrator();
    // Initialize i18n after app boots (restores language from localStorage)
    if (window.I18n) window.I18n.init();
    
    // Force Lenis to top immediately
    if (window.App && window.App.lenis) {
        window.App.lenis.scrollTo(0, { immediate: true });
    }
});

// Extra step to combat late browser scroll restorations
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        if (window.App && window.App.lenis) {
            window.App.lenis.scrollTo(0, { immediate: true });
        }
    }, 50);
});

// ─── SECURITY & ANTI-CLONING ──────────────────────────────────────────────────
(() => {
    // 1. Domain Lock (Descomente e adicione seu domínio final para ativar)
    /*
    const allowedDomains = ['localhost', '127.0.0.1', 'vercel.app', 'pedroleanza.com'];
    const currentDomain = window.location.hostname;
    const isAllowed = allowedDomains.some(d => currentDomain.includes(d));
    if (!isAllowed && currentDomain !== '') {
        document.body.innerHTML = '<div style="background:#000; color:#0f0; padding:50px; font-family:monospace; text-align:center; height:100vh; display:flex; align-items:center; justify-content:center;">UNAUTHORIZED ACCESS. DOMAIN BLOCKED.</div>';
        return;
    }
    */

    // 2. Block Context Menu (Right Click)
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 3. Block DevTools Shortcuts & Save Page
    document.addEventListener('keydown', e => {
        // F12
        if (e.key === 'F12') e.preventDefault();
        // Ctrl+Shift+I / Cmd+Option+I
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) e.preventDefault();
        // Ctrl+Shift+J / Cmd+Option+J
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) e.preventDefault();
        // Ctrl+U / Cmd+U (View Source)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) e.preventDefault();
        // Ctrl+S / Cmd+S (Save Page)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) e.preventDefault();
    });

    // 4. Prevent Dragging Images
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
})();

// 4. THE FLUID WARP TRANSITION (Spatial Warp)
class CompilationTransition {
    constructor() {
        this.section = document.getElementById("web-portfolio");
        this.orb = document.getElementById("fluid-orb");
        this.orbContainer = document.getElementById("fluid-orb-container");
        if(!this.section || !this.orb) return;
        this.init();
    }

    init() {
        // Subtle ambient pulse for the orb while resting
        gsap.to(this.orb, {
            scale: 0.6,
            opacity: 1,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // Trigger the Warp Portal when scrolling into Front-End
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.section,
                start: "top 85%", // Triggers right when the user finishes horizontal scroll and starts going down
                end: "top 30%",
                scrub: 1 // Link the animation perfectly to the scroll position
            }
        });

        // 1. The orb expands massively to engulf the screen
        // 2. We move it slightly down so it washes over the web-portfolio section
        tl.to(this.orb, {
            scale: 12, // Massive expansion
            opacity: 0.15, // Dims down to become an elegant ambient background
            y: "50vh", // Move it down to cover the new section
            duration: 1,
            ease: "power2.inOut"
        });
        
        // Add a subtle color shift to the body background temporarily
        tl.to(document.body, {
            backgroundColor: "#050505",
            duration: 1
        }, "<");
    }
}



// MOBILE MENU LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navContentWrapper = document.getElementById('nav-content-wrapper');
    
    if (mobileMenuBtn && navContentWrapper) {
        let isMenuOpen = false;
        
        window.closeMobileMenu = () => {
            if(!isMenuOpen) return;
            isMenuOpen = false;
            navContentWrapper.classList.remove('active');
            if(window.App && window.App.lenis) {
                window.App.lenis.start();
            }
        };

        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                navContentWrapper.classList.add('active');
                if(window.App && window.App.lenis) {
                    window.App.lenis.stop();
                }
            } else {
                window.closeMobileMenu();
            }
        });
    }
});
