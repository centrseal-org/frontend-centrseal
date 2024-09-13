<!--
Summary: Index of the Privacy Policy page
@copyright Copyright (c) 2024 CentrSeal. All rights reserved.
@file This file defines the privacyPolicy component.
@author Kasra Jannati
-->
<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <main>
    <Header />
    <div class="position-relative bg-offWhite overflow-hidden privacy-page">
      <v-container class="pb-16">
        <v-row class="container-width">
          <v-col cols="12">
            <section class="my-4">
              <h6 class="font-weight-medium">Privacy Policy</h6>
              <h6>Last Updated: Sep 3, 2024</h6>
            </section>
            <section class="my-4 body2">
              <div>
                CentrSeal ("we," "us," or "our") values your privacy and is
                committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, and share your information
                when you use the CentrSeal app and any associated services
                ("Services"). By using our Services, you agree to the terms of
                this Privacy Policy. If you do not agree, please do not use our
                app.
              </div>
            </section>
          </v-col>
          <v-col cols="12" class="body2">
            <section>
              <div class="font-weight-bold">1. Information We Collect</div>
              <p>
                a) Personal Information You Provide Account Information: When
                you create an account, we collect personal details such as your
                name, email address, phone number, and business information (for
                Realtors). Tenant Data: Tenants may upload paystubs, connect
                their bank accounts, and provide other verification data to
                confirm their eligibility. Realtor Information: Realtors may
                provide additional information related to their business and use
                of tenant verification tools.<br />
                b) Banking and Financial Information With your consent, we may
                collect banking information from tenants for the purpose of
                verifying their financial status. This information is gathered
                through secure third-party financial data providers and is used
                solely for verification purposes.<br />
                c) Automatically Collected Information We collect information
                about your usage of the app, including: Device Information: IP
                address, device type, browser type, and operating system. Usage
                Data: Pages viewed, time spent in the app, and interactions with
                features.<br />
                d) Cookies and Tracking Technologies We use cookies and similar
                technologies to collect information about your activity on our
                app. You can disable cookies through your browser settings, but
                this may affect the functionality of our Services.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">2. How We Use Your Information</div>
              <p>
                We use the information we collect to: Provide and improve our
                Services. Verify tenant data and assist Realtors in making
                rental decisions. Communicate with you regarding your account
                and provide customer support. Ensure the security and
                functionality of the app. Comply with legal obligations and
                enforce our Terms of Service.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">3. Sharing Your Information</div>
              <p>
                We only share your information in the following
                circumstances:<br />
                a) With Realtors (for Tenants) If you are a tenant, the
                financial information and documents you upload will be shared
                with the Realtors you are working with for verification
                purposes.<br />
                b) With Service Providers We may share your information with
                third-party service providers who assist us in providing the
                Services, such as data storage, customer support, and financial
                verification tools. These providers are required to handle your
                information securely and only for the purpose of providing their
                services.<br />
                c) For Legal and Security Purposes We may disclose your
                information if required by law, in response to legal requests,
                or to protect our rights, privacy, safety, or property, or that
                of our users or others.<br />
                d) In Business Transfers If CentrSeal is involved in a merger,
                acquisition, or asset sale, your information may be transferred
                as part of that transaction. We will notify you of such events
                and any choices you may have regarding your data.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">4. Your Data Protection Rights</div>
              <p>
                Depending on your jurisdiction, you may have the following
                rights concerning your personal information: Access: You can
                request a copy of the information we hold about you. Correction:
                You can ask us to correct any inaccuracies in your information.
                Deletion: You may request the deletion of your information where
                legally applicable. Data Portability: You may have the right to
                receive your data in a structured, commonly used format and
                transfer it to another service. Withdrawal of Consent: If you
                have given consent for data processing, you can withdraw it at
                any time. To exercise these rights, please contact us at [Insert
                Contact Information]. We will respond to your request within a
                reasonable time.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">
                5. How We Protect Your Information
              </div>
              <p>
                We take the security of your personal information seriously and
                use industry-standard measures to protect it from unauthorized
                access, loss, or misuse. These measures include encryption,
                secure servers, and regular security assessments. However, no
                method of transmission or storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">6. Data Retention</div>
              <p>
                We retain your information for as long as necessary to provide
                our Services or comply with legal obligations. If you close your
                account, we will delete or anonymize your information, except as
                required by law or for legitimate business purposes (e.g., to
                prevent fraud or enforce our agreements).
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">7. Children's Privacy</div>
              <p>
                CentrSeal is not intended for use by individuals under the age
                of 18, and we do not knowingly collect personal information from
                children. If we learn that we have collected information from a
                child, we will take steps to delete it promptly.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">
                8. International Data Transfers
              </div>
              <p>
                If you are located outside of the country where CentrSeal
                operates, your information may be transferred to and processed
                in other countries, which may have different data protection
                laws than your country of residence. By using our Services, you
                consent to such transfers.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">
                9. Changes to this Privacy Policy
              </div>
              <p>
                We may update this Privacy Policy from time to time. If we make
                significant changes, we will notify you through the app or by
                other means before the changes take effect. Your continued use
                of the app after such changes constitutes acceptance of the
                updated Privacy Policy.
              </p>
            </section>
            <section class="mt-5">
              <div class="font-weight-bold">10. Contact Us</div>
              <p>
                If you have any questions about this Privacy Policy or your
                personal information, please contact us at:<br />
                Email: info@centrseal.com<br />
                Address: [Insert Address]<br />
                Phone: [Insert Phone Number]
              </p>
            </section>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<style scoped lang="scss">
.privacy-page {
  min-height: calc(100vh - 57px);
}
.container-width {
  width: 80%;
}
</style>
