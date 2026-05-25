<script>
const DAY_MS = 86400000;

// Parse a YYYY-MM-DD string as a LOCAL date. new Date("YYYY-MM-DD") parses as
// UTC midnight, which drifts the day count by one in SG time, so build it manually.
function parseLocal(str) {
  if (!str || typeof str !== "string") return null;
  const parts = str.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => isNaN(n))) return null;
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? null : date;
}

function toStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default {
  data() {
    return {
      ordStr: "",
      enlistStr: "",
      enlistAuto: false, // true when enlistStr was derived from ORD, not typed by the user
      ready: false,
      copied: false,
    };
  },
  mounted() {
    // Read state from the URL so shared/bookmarked links restore.
    const q = this.$route.query;
    if (typeof q.ord === "string") this.ordStr = q.ord;
    if (typeof q.enlist === "string" && q.enlist) {
      this.enlistStr = q.enlist;
      this.enlistAuto = false;
    } else if (this.ordStr) {
      this.deriveEnlist();
    }
    this.ready = true;
  },
  computed: {
    today() {
      const n = new Date();
      return new Date(n.getFullYear(), n.getMonth(), n.getDate());
    },
    todayStr() {
      return toStr(this.today);
    },
    maxOrdStr() {
      // ORD can't realistically be more than ~3 years out; keeps the picker sane.
      const d = new Date(this.today);
      d.setFullYear(d.getFullYear() + 3);
      return toStr(d);
    },
    ord() {
      return parseLocal(this.ordStr);
    },
    enlist() {
      return parseLocal(this.enlistStr);
    },
    hasOrd() {
      return this.ready && this.ord !== null;
    },
    daysLeft() {
      if (!this.ord) return null;
      return Math.round((this.ord - this.today) / DAY_MS);
    },
    isOrdReached() {
      return this.daysLeft !== null && this.daysLeft <= 0;
    },
    weekendsLeft() {
      // Count Saturdays from tomorrow up to and including ORD = weekends left.
      if (!this.ord || this.daysLeft <= 0) return 0;
      let count = 0;
      const cur = new Date(this.today);
      cur.setDate(cur.getDate() + 1);
      while (cur <= this.ord) {
        if (cur.getDay() === 6) count++;
        cur.setDate(cur.getDate() + 1);
      }
      return count;
    },
    workingDaysLeft() {
      // Weekdays (Mon to Fri) from tomorrow up to and including ORD.
      if (!this.ord || this.daysLeft <= 0) return 0;
      let count = 0;
      const cur = new Date(this.today);
      cur.setDate(cur.getDate() + 1);
      while (cur <= this.ord) {
        const dow = cur.getDay();
        if (dow >= 1 && dow <= 5) count++;
        cur.setDate(cur.getDate() + 1);
      }
      return count;
    },
    weeksLeft() {
      if (this.daysLeft === null || this.daysLeft <= 0) return 0;
      return Math.floor(this.daysLeft / 7);
    },
    hasRealEnlist() {
      return !this.enlistAuto && this.enlist && this.enlist < this.ord;
    },
    progressStart() {
      if (!this.ord) return null;
      if (this.enlist && this.enlist < this.ord) return this.enlist;
      // Fallback if the field somehow ended up empty: assume a 2-year span.
      const s = new Date(this.ord);
      s.setFullYear(s.getFullYear() - 2);
      return s;
    },
    progressIsApprox() {
      return !this.hasRealEnlist;
    },
    progressPct() {
      if (!this.ord || !this.progressStart) return null;
      const total = this.ord - this.progressStart;
      if (total <= 0) return 100;
      const elapsed = this.today - this.progressStart;
      const pct = (elapsed / total) * 100;
      return Math.max(0, Math.min(100, Math.round(pct)));
    },
  },
  methods: {
    deriveEnlist() {
      // Default enlistment = ORD - 2 years. Visible and editable, but flagged as
      // an assumption so progress stays honest until the user confirms a real date.
      const o = parseLocal(this.ordStr);
      if (!o) {
        this.enlistStr = "";
        this.enlistAuto = false;
        return;
      }
      const s = new Date(o);
      s.setFullYear(s.getFullYear() - 2);
      this.enlistStr = toStr(s);
      this.enlistAuto = true;
    },
    onOrdChange(e) {
      this.ordStr = e.target.value;
      // Refresh the auto-derived enlistment, unless the user set their own.
      if (this.enlistAuto || !this.enlistStr) this.deriveEnlist();
      this.syncUrl();
    },
    onEnlistChange(e) {
      const v = e.target.value;
      if (!v) {
        // Cleared: fall back to the ORD - 2 years assumption.
        this.deriveEnlist();
      } else {
        this.enlistStr = v;
        this.enlistAuto = false;
      }
      this.syncUrl();
    },
    syncUrl() {
      if (!this.ready) return;
      const query = {};
      if (this.ordStr) query.ord = this.ordStr;
      // Only persist a user-entered enlistment date, so plain ?ord= links stay clean.
      if (this.enlistStr && !this.enlistAuto) query.enlist = this.enlistStr;
      this.$router.replace({ query }).catch(() => {});
    },
    copyLink() {
      const done = () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      };
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(() => {});
      } else {
        done();
      }
    },
  },
};
</script>

<template>
  <div class="ord-countdown">
    <div class="inputs">
      <label>
        <span>Your ORD date</span>
        <input type="date" :value="ordStr" :max="maxOrdStr" @change="onOrdChange" />
      </label>
      <label>
        <span>Enlistment date <em>(for progress)</em></span>
        <input type="date" :value="enlistStr" :max="ordStr || todayStr" @change="onEnlistChange" />
      </label>
    </div>

    <div v-if="!ready" class="msg">Loading ...</div>

    <div v-else-if="!hasOrd" class="msg">
      Enter your ORD date above to see how many days, weekends, and working days you have left.
    </div>

    <div v-else-if="isOrdReached" class="msg done">
      <div class="emoji">🎉</div>
      You've ORD'd. Congratulations, you're a free man.
    </div>

    <div v-else class="result">
      <div class="hero">
        <div class="number">{{ daysLeft }}</div>
        <div class="label">days to ORD</div>
        <div class="sub">{{ formatDate(ord) }} ({{ getDay(ord) }})</div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="n">{{ weeksLeft }}</div>
          <div class="l">weeks left</div>
        </div>
        <div class="stat">
          <div class="n">{{ weekendsLeft }}</div>
          <div class="l">weekends left</div>
        </div>
        <div class="stat">
          <div class="n">{{ workingDaysLeft }}</div>
          <div class="l">working days left</div>
        </div>
      </div>

      <div class="progress">
        <div class="bar"><div class="fill" :style="{ width: progressPct + '%' }"></div></div>
        <div class="pct">
          {{ progressPct }}% done<span v-if="progressIsApprox" class="approx"> (approx)</span>
        </div>
        <div v-if="progressIsApprox" class="hint">
          Assuming you enlisted on {{ formatDate(enlist) }} (ORD minus 2 years). Got the 8-week IPPT
          reduction or know your exact date? Change the enlistment date above for accurate progress.
        </div>
      </div>

      <div class="actions">
        <button type="button" @click="copyLink">{{ copied ? "Link copied!" : "Copy link" }}</button>
      </div>

      <p class="note">
        Working days count weekdays only (Mon to Fri). They don't subtract leave, public holidays, or duties.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ord-countdown {
  margin: 1.5em 0;

  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;

    @include mobile-screen {
      grid-template-columns: 1fr;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;

      span {
        margin-bottom: 0.35em;
        font-weight: 600;

        em {
          font-weight: 400;
          opacity: 0.7;
        }
      }

      input {
        padding: 0.5em 0.6em;
        border: 1px solid #ddd;
        border-radius: var(--b-r);
        font-size: 1rem;
        background-color: #fff;
      }
    }
  }

  .msg {
    margin-top: 1.25em;
    padding: 1.25em;
    border-radius: var(--b-r);
    background-color: #f5f5f5;
    text-align: center;

    &.done {
      background-color: var(--green-300);
    }

    .emoji {
      font-size: 2rem;
      margin-bottom: 0.25em;
    }
  }

  .result {
    margin-top: 1.25em;

    .hero {
      padding: 1.5em 1em;
      border-radius: var(--b-r);
      background-color: var(--green-300);
      text-align: center;

      .number {
        font-size: 4rem;
        font-weight: 800;
        line-height: 1;
      }

      .label {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 0.25em;
      }

      .sub {
        margin-top: 0.5em;
        opacity: 0.75;
        font-size: 0.95rem;
      }
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1em;
      margin-top: 1em;

      @include mobile-screen {
        grid-template-columns: 1fr;
      }

      .stat {
        padding: 1em;
        border-radius: var(--b-r);
        background-color: #f5f5f5;
        text-align: center;

        .n {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1;
        }

        .l {
          margin-top: 0.35em;
          font-size: 0.9rem;
          opacity: 0.75;
        }
      }
    }

    .progress {
      margin-top: 1em;

      .bar {
        height: 0.75em;
        border-radius: var(--b-r);
        background-color: #f5f5f5;
        overflow: hidden;

        .fill {
          height: 100%;
          background-color: var(--green-300);
          transition: width 0.3s ease;
        }
      }

      .pct {
        margin-top: 0.4em;
        font-size: 0.9rem;
        font-weight: 600;

        .approx {
          font-weight: 400;
          opacity: 0.7;
        }
      }

      .hint {
        margin-top: 0.4em;
        font-size: 0.85rem;
        opacity: 0.7;
      }
    }

    .actions {
      margin-top: 1em;

      button {
        padding: 0.5em 1em;
        border: 1px solid #ddd;
        border-radius: var(--b-r);
        background-color: #fff;
        font-size: 0.95rem;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }

    .note {
      margin-top: 1em;
      font-size: 0.85rem;
      opacity: 0.7;
    }
  }
}
</style>
