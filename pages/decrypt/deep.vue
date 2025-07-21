<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">深度解读</text>
      <text class="subtitle">姓名五行命盘详细分析</text>
    </view>

    <!-- 基本信息 -->
    <view class="info-section" v-if="analysisData">
      <view class="info-card">
        <text class="info-title">基本信息</text>
        <view class="info-item">
          <text class="label">姓名：</text>
          <text class="value">{{ analysisData.name }}</text>
        </view>
        <view class="info-item">
          <text class="label">出生日期：</text>
          <text class="value">{{ analysisData.birthday }}</text>
        </view>
        <view class="info-item">
          <text class="label">九宫年龄：</text>
          <text class="value">{{ analysisData.age.toFixed(1) }}岁</text>
        </view>

      </view>
    </view>



        <!-- 九宫命盘 -->
    <view class="palace-section" v-if="analysisData && analysisData.palaceInfo">
      <view class="info-card">
        <text class="info-title">姓名五行命盘</text>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">父母宫</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.fumu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.fumu.qihuaWuxing }}</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">疾恶宫</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.jiee.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.jiee.qihuaWuxing }}</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">奴仆宫</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.nupu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.nupu.qihuaWuxing }}</text>
          </view>
        </view>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">迁移宫</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">命宫</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 五行生克关系 -->
    <view class="shengke-section" v-if="analysisData && analysisData.palaceInfo">
      <view class="info-card">
        <text class="info-title">五行生克关系</text>
                 <view class="shengke-list">
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               父母宫与疾恶宫：{{ analysisData.palaceInfo.fumu.wuxing }} - {{ analysisData.palaceInfo.jiee.wuxing }}
               <text v-if="analysisData.palaceInfo.shengke.fumu_jiee" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.fumu_jiee }}）
               </text>
             </text>
           </view>
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               疾恶宫与奴仆宫：{{ analysisData.palaceInfo.jiee.wuxing }} - {{ analysisData.palaceInfo.nupu.wuxing }}
               <text v-if="analysisData.palaceInfo.shengke.jiee_nupu" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.jiee_nupu }}）
               </text>
             </text>
           </view>
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               气化五行（夫妻宫）：{{ analysisData.palaceInfo.jiee.qihuaWuxing }} - {{ analysisData.palaceInfo.nupu.qihuaWuxing }}
               <text v-if="analysisData.palaceInfo.shengke.qihua_jiee_nupu" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.qihua_jiee_nupu }}）
               </text>
             </text>
           </view>
         </view>
      </view>
    </view>

    <!-- 思想功能三段五期解析 -->
    <view v-if="matchedSixiang" class="sixiang-section">
      <view class="info-card">
        <text class="info-title">思想功能解析</text>
        <view class="sixiang-desc-tip">
          思想功能主要源自你的天赋，对你35岁之前影响尤为显著，尤其影响你与外部环境及上级的互动方式。
        </view>
        <view class="sixiang-attr">
          <text>五行生克关系：{{ wuxingRelation }}</text>
        </view>
        <text class="sixiang-feature">三段五期：{{ matchedSixiang.五期 }}</text>
        <text class="sixiang-feature">你的特质：{{ matchedSixiang.原解析优化 }}</text>
      </view>
    </view>
    <!-- 思想功能磁场体系 -->
    <view v-if="matchedMagnetic" class="sixiang-magnetic-section">
      <view class="info-card">
        <text class="info-title">思想功能磁场体系 - {{ magneticType }}</text>
        <text class="magnetic-rule">判定规则：{{ matchedMagnetic.判定规则 }}</text>
        <text v-if="matchedMagnetic.先天磁场特质" class="magnetic-feature">先天磁场特质：{{ matchedMagnetic.先天磁场特质 }}</text>
        <text v-if="matchedMagnetic.关系经营建议" class="magnetic-feature">关系经营建议：{{ matchedMagnetic.关系经营建议 }}</text>
        <view v-if="matchedMagnetic.关系经营细分策略">
          <text v-for="(val, subkey) in matchedMagnetic.关系经营细分策略" :key="subkey">
            {{ subkey }}：{{ val }}
          </text>
        </view>
        <text v-if="matchedMagnetic.风险与破局" class="magnetic-feature">风险与破局：{{ matchedMagnetic.风险与破局 }}</text>
        <view v-if="matchedMagnetic.磁场强度与性格关联">
          <text class="magnetic-subtitle">磁场强度与性格关联：</text>
          <view v-for="(val, subkey) in matchedMagnetic.磁场强度与性格关联" :key="subkey">
            <text>{{ subkey }}：{{ typeof val === 'string' ? val : '' }}</text>
            <view v-if="typeof val === 'object'">
              <text v-for="(v, k) in val" :key="k">{{ k }}：{{ v }}</text>
            </view>
          </view>
        </view>
        <text v-if="matchedMagnetic.先天磁场特质与发展建议" class="magnetic-feature">发展建议：{{ matchedMagnetic.先天磁场特质与发展建议 }}</text>
        <text v-if="matchedMagnetic.风险与避坑" class="magnetic-feature">风险与避坑：{{ matchedMagnetic.风险与避坑 }}</text>
        <view v-if="matchedMagnetic.案例">
          <text class="magnetic-case">案例：{{ matchedMagnetic.案例.人物 }}——{{ matchedMagnetic.案例.解析 }}</text>
        </view>
      </view>
    </view>
    <!-- 思想功能解析 -->
    <view v-if="matchedYinyang && matchedYinyang.length" class="yinyang-section">
      <view class="info-card">
        <text class="info-title">思想功能解析</text>
        <text class="yinyang-core">核心逻辑：{{ yinyangPeihe.核心逻辑 }}</text>
        <view class="yinyang-mode-list">
          <text class="yinyang-subtitle">配合度模式：</text>
          <view v-for="(mode, idx) in matchedYinyang" :key="idx" class="yinyang-mode-item">
            <text class="yinyang-mode-title">{{ mode.模式 }}</text>
            <text>你的特质：{{ mode.特质 }}</text>
            <text v-if="mode.案例关联">案例关联：{{ mode.案例关联 }}</text>
            <view v-if="mode.案例">
              <text>案例：{{ mode.案例.人物 }}——{{ mode.案例.解析 }}</text>
            </view>
          </view>
        </view>
        <view v-if="matchedSixiang">
          <text class="sixiang-feature">三段五期：{{ matchedSixiang.五期 }}</text>
          <text class="sixiang-feature">你的特质：{{ matchedSixiang.原解析优化 }}</text>
        </view>
      </view>
    </view>
    <!-- 咨询通道 -->
    <view class="consultation-section">
      <view class="info-card">
        <text class="info-title">咨询通道</text>
        <view class="qr-container">
          <image src="/static/images/qr430.png" class="qr-image" mode="aspectFit"></image>
        </view>
        <text class="consultation-text">若您想深入了解服务细节，扫码添加客服，我们将为您安排专属老师一对一讲解。</text>
      </view>
    </view>
    <!-- 返回按钮 -->
    <view class="back-section">
      <button @click="goBack" class="back-btn">
        返回重新分析
      </button>
    </view>
  </view>
</template>

<script>
// 五行与数字映射：1/2=木，3/4=火，5/6=土，7/8=金，9/0=水
// 五行相生：木生火，火生土，土生金，金生水，水生木
// 五行相克：金克木，木克土，土克水，水克火，火克金
export default {
  data() {
    return {
      analysisData: null,
      "sixiangAnalysisList": [
		{
		  "三段": "革命階段",
		  "五期": "革命時期",
		  "剋宮": "金剋木",
		  "平宮": "木木",
		  "木宮": "木生火",
		  "特质": "具备金剋木、木木平宫或木生火思想功能者，适配于初创型企业或全新业务线开拓场景。在新秩序构建的发展周期中，其创新思维与开拓精神可充分释放，能够有效突破业务空白壁垒，精准捕捉新兴机遇，为事业开拓奠定基础。",
		  "原解析优化": "此阶段的个体处于创新驱动的发展场域。无论是加入初创企业，抑或投身企业全新产品线的从零到一构建，其创意创新能力与改革突破意识，可成为打破市场空白、建立竞争优势的核心动力。在当代新赛道涌现、行业格局待重塑的时代背景下，凭借冒险精神与开创力，能够在未被充分开发的业务领域实现突破，构建独特的发展路径，为新事业的落地与拓展提供关键支撑。"
		},
		{
		  "三段": "太平時期",
		  "五期": "太平初期",
		  "剋宮": "木剋土",
		  "平宮": "土土",
		  "木宮": "土生金",
		  "特质": "在太平初期，制度构建与秩序整合为核心发展需求。你更注重规则体系搭建，擅长将创意理念与发展方向，通过制度化流程进行结构化梳理，适配于成立初期、急需建立规范管理体系的组织，其专业能力易获得管理层认可，在强调制度执行的环境中具备发展优势。",
		  "原解析优化": "太平初期制度奠基的发展阶段。你具备制度架构设计与秩序整合能力，能够将零散的创意与战略方向，转化为清晰可执行的制度化流程，为组织运营提供规范支撑。在当前新兴企业、创新业务板块普遍存在管理流程空白的市场环境下，可有效填补制度缺口，满足组织发展初期对规范化、体系化管理的需求，因契合阶段发展本质，能够获得决策层的重视与任用，成为推动组织制度建设的核心力量。"
		},
		{
		  "三段": "太平時期",
		  "五期": "太平末期",
		  "剋宮": "土剋水",
		  "平宮": "水水",
		  "木宮": "水生木",
		  "特质": "太平末期，伦理价值与组织协同成为关键发展要素。你坚守伦理准则，具备较强的组织协同意识，在组织处于稳定繁荣、强调团队共识的发展阶段，能够通过高配合度与价值坚守，促进组织高效运转，其行为模式与阶段需求高度适配。",
		  "原解析优化": "太平末期伦理传承与组织协同的发展周期。你作为伦理秩序的维护者，在时代价值多元冲击下，仍能坚守尊师重道、协同共进的核心准则。在组织进入稳定繁荣期，需强化团队共识以提升运营效率时，其高配合度能够有效减少内耗，成为组织协同发展的关键纽带。无论外部环境如何变化，凭借对伦理价值的坚守，可在强调秩序与协同的组织生态中，发挥稳定器作用，保障组织发展的连贯性与一致性。"
		},
		{
		  "三段": "淫亂時期",
		  "五期": "淫亂初期",
		  "剋宮": "水剋火",
		  "平宮": "火火",
		  "木宮": "火生土",
		  "特质": "淫乱初期，环境变化与趋势洞察为核心竞争要素。你具备敏锐的趋势感知能力，能够快速识别环境变化中的优势方向，并及时调整行动策略，适配于行业格局分化、多元机遇涌现的发展阶段，可凭借'识变应变'能力捕捉稀缺机会。",
		  "原解析优化": "淫乱初期多元分化的发展阶段。你作为趋势洞察者，能够精准捕捉行业格局变化中的潜在机遇，有效识别优势发展方向并迅速响应。在当代社会从统一价值体系向多元分化转型，各领域机遇与挑战并存的市场环境下，可借助对变化的敏锐感知，在复杂的发展网络中寻找突破路径，将环境波动转化为个人发展机遇，通过持续的策略调整与行动优化，实现个体价值的最大化挖掘。"
		},
		{
		  "三段": "淫亂時期",
		  "五期": "淫亂末期",
		  "剋宮": "火剋金",
		  "平宮": "金金",
		  "木宮": "金生水",
		  "特质": "至淫乱末期，沟通协调与共识构建成为组织发展关键。你擅长跨部门协同与群体共识达成，能够有效化解组织复杂协作矛盾，在社会贫富分化加剧、民意表达多元的环境背景下，其沟通能力可成为破解协作困境的核心工具，适配于大型组织复杂协作场景与社会公共事务协调场景。",
		  "原解析优化": "淫乱末期沟通主导的发展阶段。你作为协同协调者，具备构建群体共识与化解协作矛盾的专业能力。在当前社会贫富差距扩大、民意表达渠道多元，组织跨部门协作复杂度持续提升的环境中，可通过高效沟通与协调，打破协作壁垒，促进多元主体间的价值共识与行动协同。无论是大型企业跨业务板块协作，还是社会公共事务的多元主体参与，其沟通天赋能够有效降低协作成本，成为推动组织与社会协同发展的关键力量，在'沟通驱动发展'的时代趋势下，具备广阔的价值施展空间。"
		}
	  ],
      sixiangMagneticField: {
        "阳性反应": {
          "判定规则": "将疾恶宫视为自身，若为「自生」或「剋父母宫」，且箭嘴方向为自身向上延伸，判定为思想功能阳性反应",
          "先天磁场特质": "你能力突出且易展现，上级认可能力但因个性强势，难获纯粹「关爱」；属能力驱动型命格，易对上层产生隐性抗性，常主动提建议给上层造成压力，或因急切推进事务与上级风格冲突",
          "关系经营建议": "聚焦执行，优先落地上级交办事务，减少主动输出过多建议；公开场合、有主管在场时保持低调，避免过度展现能力「招忌」；平衡能力与人际，表现五分能力，留五分精力经营人际关系，牢记「功不震主」，将功劳关联上层指导",
          "案例": {
            "人物": "赵薇",
            "解析": "思想功能属阳性反应，能力与演技优势明显，但因主动行为引发争议、上层关系经营不足，发展势能难持续，提示阳性反应者能力是基础，上层关系经营是「放大器」，缺一易陷入「有能难用」困境"
          }
        },
        "阴性反应": {
          "判定规则": "将疾恶宫视为自身，若为「父母宫生」或「剋自己」，且箭嘴方向为上层指向自身，判定为思想功能阴性反应",
          "先天磁场特质": "你天生易获上层关爱与提拔，属机遇驱动型命格；对长辈、上司敬重无抗性，自然更易被青睐，只需展现3分能力，花7分精力经营人际关系，就能触发上层赏识、获得晋升机会",
          "关系经营细分策略": {
            "生宫阴性反应": "重点经营直接上层（如直属领导），维护好与直属上级关系，等于握住「发展钥匙」",
            "剋宫阴性反应": "除公司上层外，拓展人脉经营（如合作公司高层、行业长辈等 ），保持优质关系网，持续获取跨领域机遇"
          },
          "风险与破局": "若感受不到上层关爱，多因过度被动，能力难被察觉、与上层无有效互动，浪费先天优势；若性格难改变，建议调整心态接受「机遇需主动抓取」本质，或主动创造「被看见」场景（如适度展示能力、参与上层关注的项目 ）激活优势",
          "案例": {
            "人物": "林心如",
            "解析": "思想功能属阴性反应，《还珠格格》后持续获得演出、广告机遇，除自身努力，与「上层关系磁场适配」强相关，广告高频曝光、影视资源稳定，印证阴性反应者经营上层关系后的发展红利"
          }
        },
        "平宫（无天格）": {
          "判定规则": "思想功能平宫又称「无天格」，当父母宫与疾恶宫形成两条平衡线，判定为无天格",
          "磁场强度与性格关联": {
            "行动功能阳性反应": "整体命格属阳性反应，磁场力量减半（需参照阳性反应注意事项经营关系 ）",
            "行动功能阴性反应": "整体命格属阴性反应，无天格磁场力量增强（需抓住机遇、强化关系经营 ）",
            "思想与行动均平宫（同五行）": {
              "纯奇偶数字": "偏向阴性反应（形象优势突出，磁场「稳」 ）",
              "奇偶混合数字": "偏向阳性反应（阴阳互动产生动能，能力优势易显 ）"
            }
          },
          "先天磁场特质与发展建议": "寓意「与上层平等互动」，适合官场、政府、大公司任职，经营好上层关系易获认可与任用，上层对你的需求更易响应；新公司融入优先突显专业领域价值，让上层感知能力；发展中需遵循「顺势而为」逻辑，顺着上层方向推进，先获取「天下」（职场地位 ），再尝试开创个人风格",
          "风险与避坑": "优势是「平等互动」，但易因过度随性破坏职场生态，与上层相处没大没小、忽视「对上尊重」，恃宠而骄易触怒上级；「被动不表现」会让优势完全失效，需主动展示能力，激活「上层有求必应」的先天势能，避免因「不动」浪费机遇",
          "案例": {
            "人物": "陶晶莹",
            "解析": "属「无天格+阳性反应」，凭借新闻背景获赏识，能力受认可但形象争议伴随，印证无天格阳性反应者能力易突围，但需更谨慎经营「上层关系边界」，平衡能力与职场生态"
          }
        }
      },
      yinyangPeihe: {
        "核心逻辑": "磁场应用需阴阳互补，不能单一追求某类磁场（如阴性反应看似有机运，但过度选择会导致被动；为子女改阴性反应名，反让父母疲惫 ）",
        "阴阳判定规则": [
          { "类型": "自身思想功能 - 阴性反应", "判定": "把疾恶宫当自己，若为父母宫生或剋自己，箭嘴由上面指向自己，属思想功能阴性反应" },
          { "类型": "自身思想功能 - 阳性反应", "判定": "把疾恶宫当自己，若为自己生或剋父母宫，箭嘴由自己指向上方，属思想功能阳性反应" },
          { "类型": "老板行动功能 - 阴性反应", "判定": "老板命格中，若为奴仆宫生或剋疾恶宫，属行动功能阴性反应" },
          { "类型": "老板行动功能 - 阳性反应", "判定": "若为老板的疾恶宫生或剋奴仆宫，属行动功能阳性反应" },
          { "类型": "自身平宫 - 阴性反应", "判定": "思想功能是无天格平宫，数字为纯奇数/纯偶数（平宫动能少 + 同数字更不动 → 偏向阴性反应 ）" },
          { "类型": "自身平宫 - 阳性反应", "判定": "思想功能是无天格平宫，数字为奇数 + 偶数（阴阳合一产生动能 → 偏向阳性反应 ）" },
          { "类型": "老板平宫 - 阴性反应", "判定": "老板行动功能是无地格平宫，数字为纯奇数/纯偶数 → 属行动功能阴性反应" },
          { "类型": "老板平宫 - 阳性反应", "判定": "老板行动功能是无地格平宫，数字为奇数 + 偶数 → 属行动功能阳性反应" }
        ],
        "配合度模式": [
          {
            "模式": "你的思想功能（阳） ↔ 老板行动功能（阴）",
            "特质": "你能力强、主动付出，擅长发现并处理细节、提新点子；老板喜欢主动型下属，期望下属思考执行方向后讨论决策，双方处事模式契合，是合拍的上下级",
            "案例关联": "可结合「严凯泰（纯阳性反应）」案例理解阳性特质，反向推导与阴性老板的配合逻辑"
          },
          {
            "模式": "你的思想功能（阳） ↔ 老板行动功能（阳）",
            "特质": "你能力强、主动付出、爱提意见；但老板强势管理，对工作有既定看法，期望下属按指令行动。建议非独特见解时，专注执行、展现配合度，成为「出力助手」",
            "案例": {
              "人物": "严凯泰",
              "解析": "思想与行动功能均为阳性反应（纯阳性），可参考其特质理解「阳性+阳性」配合中，下属需调整的处事逻辑"
            }
          },
          {
            "模式": "你的思想功能（阴） ↔ 老板行动功能（阳）",
            "特质": "你配合度高，喜欢老板明确目标后执行；老板强势管理、有既定工作看法，期望下属按指令行动，双方处事模式高度契合，你易成为老板「爱将」",
            "案例关联": "可结合「林心如（阴性反应）」案例强化对阴性特质的理解，推导与阳性老板的配合优势"
          },
          {
            "模式": "你的思想功能（阴） ↔ 老板行动功能（阴）",
            "特质": "你配合度高，习惯按老板明确目标执行；但老板喜欢主动型下属，期望下属思考细节后讨论决策。建议你逐步学会主动，契合老板期望",
            "案例": {
              "人物": "吴宗宪、康康",
              "解析": "吴宗宪行动功能阴性，康康受行动功能阳性影响（无天格但行为偏阳 ），两人形成「阴性老板+阳性下属」的互补；康康主动积极，吴宗宪授权放任，互动良好，印证阴阳配合的实践逻辑"
            }
          }
        ]
      }
    }
  },
  onLoad() {
    // 从本地存储获取分析数据
    const data = uni.getStorageSync('currentAnalysis');
    if (data) {
      this.analysisData = data;
      console.log('Loaded analysis data:', data);
      console.log('Palace info:', data.palaceInfo);
      if (data.palaceInfo) {
        console.log('Fumu palace:', data.palaceInfo.fumu);
        console.log('Jiee palace:', data.palaceInfo.jiee);
        console.log('Nupu palace:', data.palaceInfo.nupu);
        console.log('Ming palace:', data.palaceInfo.ming);
        console.log('Qianyi palace:', data.palaceInfo.qianyi);
        console.log('Shengke info:', data.palaceInfo.shengke);
      }
    } else {
      console.error('No analysis data found');
      uni.showToast({
        title: '未找到分析数据',
        icon: 'none'
      });
      // 如果没有数据，返回上一页
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  onShow() {
    // 检查本地是否有登录信息
    const userInfo = uni.getStorageSync('userInfo');
    if (!userInfo) {
      this.doWeixinLogin();
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    // 五行生克关系判定函数
    getWuxingRelation(a, b) {
      if (a === b) return a + b; // 平宫
      // 相生
      if (a === '木' && b === '火') return '木生火';
      if (a === '火' && b === '土') return '火生土';
      if (a === '土' && b === '金') return '土生金';
      if (a === '金' && b === '水') return '金生水';
      if (a === '水' && b === '木') return '水生木';
      // 相克
      if (a === '金' && b === '木') return '金剋木';
      if (a === '木' && b === '土') return '木剋土';
      if (a === '土' && b === '水') return '土剋水';
      if (a === '水' && b === '火') return '水剋火';
      if (a === '火' && b === '金') return '火剋金';
      return '';
    },
    doWeixinLogin() {
      // 微信小程序登录流程
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          // 这里通常需要将 code 发送到后端换取 openid 和用户信息
          // 假设后端返回 userInfo
          uni.request({
            url: 'https://your.api/login', // 替换为你的后端登录接口
            method: 'POST',
            data: { code: loginRes.code },
            success: (res) => {
              if (res.data && res.data.userInfo) {
                uni.setStorageSync('userInfo', res.data.userInfo);
                // 可选：this.userInfo = res.data.userInfo;
              } else {
                uni.showToast({ title: '登录失败，请重试', icon: 'none' });
              }
            }
          });
        },
        fail: () => {
          uni.showToast({ title: '请先登录微信后再使用本服务', icon: 'none' });
        }
      });
    }
  },
  computed: {
    // 1. 思想功能关系
    wuxingRelation() {
      if (!this.analysisData || !this.analysisData.palaceInfo) return '';
      const fumu = this.analysisData.palaceInfo.fumu.wuxing;
      const jiee = this.analysisData.palaceInfo.jiee.wuxing;
      // 优先用methods里的getWuxingRelation
      return this.getWuxingRelation(fumu, jiee);
    },
    // 2. 匹配三段五期
    matchedSixiang() {
      return this.sixiangAnalysisList.find(item => item.剋宮 === this.wuxingRelation || item.平宮 === this.wuxingRelation || item.木宮 === this.wuxingRelation);
    },
    // 3. 思想功能磁场类型
    magneticType() {
      if (!this.analysisData || !this.analysisData.palaceInfo) return '';
      const fumu = this.analysisData.palaceInfo.fumu.wuxing;
      const jiee = this.analysisData.palaceInfo.jiee.wuxing;
      if (fumu === jiee) return '平宫（无天格）';
      // 判断箭头方向
      // 疾恶宫生/克父母宫，箭头自己指向父母宫
      const jieeToFumu = this.getWuxingRelation(jiee, fumu);
      if (jieeToFumu.endsWith('生') || jieeToFumu.endsWith('剋')) return '阳性反应';
      // 父母宫生/克疾恶宫，箭头父母宫指向自己
      const fumuToJiee = this.getWuxingRelation(fumu, jiee);
      if (fumuToJiee.endsWith('生') || fumuToJiee.endsWith('剋')) return '阴性反应';
      return '';
    },
    matchedMagnetic() {
      return this.sixiangMagneticField[this.magneticType];
    },
    // 4. 阴阳配合（如有老板信息可扩展）
    matchedYinyang() {
      if (!this.magneticType) return null;
      return this.yinyangPeihe.配合度模式.filter(mode => mode.模式.includes(this.magneticType[0]));
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;
  background: linear-gradient(135deg, #F5F5DC 0%, #E8E4C9 100%);
  min-height: 100vh;
  // 新增：PC端居中和最大宽度
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 100%;
}

@media (min-width: 700px) {
  .container {
    max-width: 700px;
    padding: 40px 32px 32px 32px;
    border-radius: 18px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.08);
    min-height: 80vh;
  }
  .info-card {
    padding: 32px 36px;
    border-radius: 18px;
  }
  .title {
    font-size: 30px;
  }
  .subtitle {
    font-size: 18px;
  }
  .info-title {
    font-size: 22px;
  }
  .back-btn {
    font-size: 20px;
    height: 56px;
    border-radius: 28px;
  }
  .sixiang-title, .magnetic-title, .yinyang-mode-title {
    font-size: 18px;
  }
  .sixiang-feature, .magnetic-feature, .yinyang-core, .yinyang-subtitle {
    font-size: 16px;
  }
  .sixiang-desc, .magnetic-case {
    font-size: 15px;
  }
  .palace-list {
    gap: 18px;
  }
  .palace-item {
    min-width: 120px;
    padding: 16px 12px;
  }
  .qr-image {
    width: 240px;
    height: 240px;
  }
  .consultation-text {
    font-size: 16px;
  }
}

@media (min-width: 1100px) {
  .container {
    max-width: 900px;
    padding: 48px 0 48px 0;
  }
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.info-section, .palace-section, .shengke-section, .sixiang-section, .sixiang-magnetic-section, .yinyang-section {
  margin-bottom: 25px;
}

.info-card {
  background: #FEFEF8;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: block;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-size: 16px;
  color: #666;
}

.value {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}





.palace-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.palace-item {
  flex: 1 1 28%;
  min-width: 90px;
  background: #fff;
  border-radius: 8px;
  padding: 10px 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.palace-label {
  font-size: 13px;
  color: #888;
}

.palace-wuxing, .palace-qihua {
  font-size: 13px;
  color: #666;
}

.shengke-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shengke-item {
  background: #eaf2f8;
  border-radius: 8px;
  padding: 12px;
}

.shengke-text {
  font-size: 14px;
  color: #357abd;
  line-height: 1.4;
}

.shengke-relation {
  color: #e74c3c;
  font-weight: bold;
}

.sixiang-item {
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}
.sixiang-title {
  font-size: 16px;
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 4px;
  display: block;
}
.sixiang-attr {
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
  display: flex;
  gap: 12px;
}
.sixiang-feature {
  font-size: 14px;
  color: #357abd;
  margin-bottom: 2px;
  display: block;
}
.sixiang-desc {
  font-size: 13px;
  color: #666;
  display: block;
}
.sixiang-desc-tip {
  background: #f5f5f5;
  color: #888;
  font-size: 13px;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 12px 0 18px 0;
  line-height: 1.6;
}
@media (min-width: 700px) {
  .sixiang-desc-tip {
    font-size: 15px;
    padding: 14px 20px;
  }
}

.sixiang-magnetic-section, .yinyang-section {
  margin-bottom: 25px;
}
.magnetic-item, .yinyang-mode-item, .yinyang-rule-item {
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.magnetic-title, .yinyang-mode-title {
  font-size: 15px;
  font-weight: bold;
  color: #e67e22;
  margin-bottom: 2px;
  display: block;
}
.magnetic-rule, .magnetic-feature, .magnetic-case, .yinyang-core, .yinyang-subtitle {
  font-size: 13px;
  color: #357abd;
  margin-bottom: 2px;
  display: block;
}
.magnetic-subtitle {
  font-size: 13px;
  color: #888;
  margin-bottom: 2px;
  display: block;
}
.yinyang-mode-title {
  color: #16a085;
}

.back-section {
  margin-top: 30px;
}

.back-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn:active {
  transform: scale(0.98);
}
.consultation-section {
  margin-bottom: 25px;
}
.qr-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.qr-image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.consultation-text {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-top: 16px;
  display: block;
}
</style> 