window.tipJar = (function() {
    var vars = {
        hasTip: false,
        originalAmt: 0,
        tip: 0,
        opts: {
            useEngagingNetworksHooks: false,
            attachToSubmitClick: true,
            exposedSubmitHandler: "tipJarSubmit",
            percentage: 0.022,
            additionalAmt: 0.3,
            tipjarContent: "I would like to cover the transaction fees so that my gift can do <em>even more</em> to help animals.",
            tipjarContentChecked: " <strong>My total contribution will be $%newtotal%.</strong>",
            dynamicTipIntro: false,
        },
    };
    var initDOM = function(opts) {
        console.log("tipjar init();");
        $.extend(vars.opts, opts);
        if (vars.opts.useEngagingNetworksHooks == false && vars.opts.attachToSubmitClick == true)
            $(".en__submit button").addClass("ignore");
        if (vars.opts.dynamicTipIntro == true) {
            var tip = calculateTip(getCurrentAmount());
            vars.opts.tipjarContent = vars.opts.tipjarContent.replace("%tipcost%", "<span>" + tip.tip + "</span>");
        }
        var html = "";
        html += '<div class="en__field en__field--checkbox">';
        html += '<div class="en__field__item tipjar-wrapper">';
        html += '<input id="tip-jar" type="checkbox" class="en__field__input en__field__input--checkbox">';
        html += '<label for="tip-jar" class="en__field__label en__field__label--item">';
        html += '<div class="tipjar-content"><span class="step1">' + vars.opts.tipjarContent + "</span>";
        html += '<span class="step2"></span></div>';
        html += "</label>";
        html += "</div></div>";
        $(html).insertBefore(".en__submit");
        addListeners();
        $('input[name="transaction.recurrpay"]').click(function() {
            console.log("recurr click");
            addListeners();
            $('input[name="transaction.donationAmt"]:checked').click();
        });

        $(document).ready(function () {
          setTimeout(function(){
            $('.en__component--row--3').click(function() {
              addListeners();
            });
            $('.en__component--customDonationAmount input').change(function() {
              addListeners();
            });
         },1000);
        });

        var resultObj = {
            initDOM: initDOM
        };
        if (vars.opts.useEngagingNetworksHooks == true)
            window.enOnSubmit = updateAndSubmit;
        else if (vars.opts.attachToSubmitClick == false)
            window.tipJar[vars.opts.exposedSubmitHandler] = updateAndSubmit;
        return resultObj;
    };
    var addListeners = function() {
        console.log("listeners added");
        $(".tipjar-wrapper #tip-jar").click(function() {
            if ($(this).is(":checked")) {
                addTip();
                ga("send", "event", "tipjar", "enable");
            } else {
                hideTipConfirmation();
                ga("send", "event", "tipjar", "disable");
            }
        });
        setTimeout(function() {
            $('input[name="transaction.donationAmt"]:not([value=""])').click(function() {
                handleGiftstringInteraction();
            });
            $('input[name="transaction.donationAmt.other"]').blur(function() {
                handleGiftstringInteraction();
            });
            handleGiftstringInteraction();
        }, 1000);
        if (vars.opts.useEngagingNetworksHooks == false && vars.opts.attachToSubmitClick == true) {
            $(".en__submit button").click(function(e) {
                if ($(this).hasClass("ignore")) {
                    e.preventDefault();
                    updateAndSubmit();
                    return false;
                }
            });
        }
    };
    var handleGiftstringInteraction = function() {
        console.log("interaction");
        console.log($('input[name="transaction.donationAmt"]:checked').val());
        if (vars.hasTip == true) {
            hideTipConfirmation();
            $(".tipjar-wrapper #tip-jar").prop("checked", false);
        }
        if (vars.opts.dynamicTipIntro == true) {
            var tip = calculateTip(getCurrentAmount());
            console.log(tip);
            $(".tipjar-wrapper .step1 span").html(tip.tip);
        }
    };
    var addTip = function() {
        var currentAmount = getCurrentAmount();
        if (!isNaN(currentAmount)) {
            renderTipConfirmation(currentAmount);
        }
    };
    var renderTipConfirmation = function(currentAmount) {
        var amt = calculateTip(currentAmount);
        $(".tipjar-wrapper .step2").html(vars.opts.tipjarContentChecked.replace("%newtotal%", amt.total)).show();
        vars.hasTip = true;
        vars.originalAmt = currentAmount;
        vars.tip = amt.tip;
        vars.newTotal = amt.total;
    };
    var calculateTip = function(amt) {
        var percentage = vars.opts.percentage;
        var additional = vars.opts.additionalAmt;
        var ret = {
            tip: (amt * percentage + additional).toFixed(2),
            total: (amt * (1 + percentage) + additional).toFixed(2),
        };
        return ret;
    };
    var hideTipConfirmation = function() {
        vars.hasTip = false;
        $(".tipjar-wrapper .step2").html("").hide();
    };
    var getCurrentAmount = function() {
        if ($('input[name="transaction.donationAmt"]:checked').val() > 0) {
            return $('input[name="transaction.donationAmt"]:checked').val();
        } else {
            return $('input[name="transaction.donationAmt.other"]').val();
        }
    };
    var updateAndSubmit = function() {
        console.log("submit");
        if (vars.hasTip == true) {
            $('input[name="transaction.donationAmt"]:last-of-type').click();
            $('input[name="transaction.donationAmt.other"]').val(vars.newTotal);
            jQuery("[name='supporter.questions.223994']").val("Y");
            ga("send", "event", "tipjar", "submit");
        }
        if (vars.opts.useEngagingNetworksHooks == false && vars.opts.attachToSubmitClick == true) {
            $(".en__submit button").removeClass("ignore");
            $(".en__submit button").click();
        }
    };
    return {
        initDOM: initDOM
    };
}
)();
