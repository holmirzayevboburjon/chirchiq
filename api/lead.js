<script>
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form2031754253");
  if (!form) return;

  const successBox = form.querySelector(".js-successbox");
  const errorBoxes = form.querySelectorAll(".js-errorbox-all");
  const submitBtn = form.querySelector('button[type="submit"]');

  function showError(message) {
    errorBoxes.forEach((box) => {
      const item = box.querySelector(".js-rule-error-all");
      if (item) item.textContent = message;
      box.style.display = "block";
    });
  }

  function hideError() {
    errorBoxes.forEach((box) => {
      box.style.display = "none";
    });
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideError();

    const nameInput = form.querySelector('input[name="Name"]');
    const phoneInput = form.querySelector('input[name="Phone"]');

    const name = (nameInput?.value || "").trim();
    const phone = (phoneInput?.value || "").trim();

    if (!name || !phone) {
      showError("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          page: window.location.href
        })
      });

      const result = await response.json();

      if (result.ok) {
        if (successBox) {
          successBox.style.display = "block";
          successBox.innerHTML = "Ma’lumot muvaffaqiyatli yuborildi.";
        }

        form.reset();

        setTimeout(function () {
          window.location.href = "/";
        }, 1200);
      } else {
        showError(result.message || "Xatolik yuz berdi.");
      }
    } catch (error) {
      showError("Server bilan ulanishda xatolik yuz berdi.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    }
  });
});
</script>
